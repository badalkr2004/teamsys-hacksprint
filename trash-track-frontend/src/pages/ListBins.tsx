import { useState, useEffect } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import { MapPin, Loader2, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Location {
  _id: string;
  address: string;
  description: string;
  location_latitude: number;
  location_longitude: number;
  date_created: string;
}

interface SortConfig {
  key: keyof Location | null;
  direction: 'asc' | 'desc';
}

interface SortHeaderProps {
  column: keyof Location;
  label: string;
}

const ListBins = () => {
  const [locations, setLocations] = useState<Location[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [sortConfig, setSortConfig] = useState<SortConfig>({
    key: null,
    direction: 'asc',
  });

  const itemsPerPage = 10;

  useEffect(() => {
    fetchLocations();
  }, []);

  const fetchLocations = async () => {
    try {
      setIsLoading(true);
      const response = await fetch('', {
        cache: 'no-cache',
      });
      if (!response.ok) throw new Error('Failed to fetch data');
      const result = await response.json();
      setLocations(result.data);
      setError(null);
    } catch (err) {
      setError(
        `Error fetching locations: ${
          err instanceof Error ? err.message : 'Unknown error'
        }`
      );
    } finally {
      setIsLoading(false);
    }
  };

  const formatDate = (dateString: string): string => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const sortData = (key: keyof Location): void => {
    let direction: 'asc' | 'desc' = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const getSortedData = (): Location[] => {
    if (!sortConfig.key) return locations;

    const key = sortConfig.key;

    return [...locations].sort((a, b) => {
      if (sortConfig.key === 'date_created') {
        return sortConfig.direction === 'asc'
          ? new Date(a.date_created).getTime() -
              new Date(b.date_created).getTime()
          : new Date(b.date_created).getTime() -
              new Date(a.date_created).getTime();
      }

      if (a[key] < b[key]) {
        return sortConfig.direction === 'asc' ? -1 : 1;
      }
      if (a[key] > b[key]) {
        return sortConfig.direction === 'asc' ? 1 : -1;
      }
      return 0;
    });
  };

  const filteredData = getSortedData().filter(
    (location) =>
      location.address?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      location.location_latitude?.toString().includes(searchTerm) ||
      location.location_longitude?.toString().includes(searchTerm) ||
      location.description?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const paginatedData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const SortHeader = ({ column, label }: SortHeaderProps) => (
    <div
      className="flex items-center gap-2 cursor-pointer"
      onClick={() => sortData(column)}
    >
      {label}
      {sortConfig.key === column && (
        <span className="text-xs">
          {sortConfig.direction === 'asc' ? '↑' : '↓'}
        </span>
      )}
    </div>
  );

  const viewOnMap = (latitude: number, longitude: number): void => {
    window.open(
      `https://www.google.com/maps?q=${latitude},${longitude}`,
      '_blank'
    );
  };

  if (error) {
    return (
      <Card className="w-full">
        <CardContent className="p-6">
          <div className="text-red-500">{error}</div>
        </CardContent>
      </Card>
    );
  }

  const renderPagination = () => {
    if (totalPages <= 1) return null;

    const handlePrevious = () => {
      if (currentPage > 1) {
        setCurrentPage((prev) => prev - 1);
      }
    };

    const handleNext = () => {
      if (currentPage < totalPages) {
        setCurrentPage((prev) => prev + 1);
      }
    };

    return (
      <div className="mt-4">
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  handlePrevious();
                }}
                className={
                  currentPage === 1 ? 'pointer-events-none opacity-50' : ''
                }
              />
            </PaginationItem>

            {[...Array(totalPages)].map((_, i) => (
              <PaginationItem key={i + 1}>
                <PaginationLink
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    setCurrentPage(i + 1);
                  }}
                  isActive={currentPage === i + 1}
                >
                  {i + 1}
                </PaginationLink>
              </PaginationItem>
            ))}

            <PaginationItem>
              <PaginationNext
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  handleNext();
                }}
                className={
                  currentPage === totalPages
                    ? 'pointer-events-none opacity-50'
                    : ''
                }
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    );
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          <span>Location Data</span>
          <Button
            variant="outline"
            onClick={fetchLocations}
            disabled={isLoading}
          >
            {isLoading ? 'Refreshing...' : 'Refresh Data'}
          </Button>
        </CardTitle>
        <div className="mt-4">
          <Input
            placeholder="Search locations..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="max-w-sm"
          />
        </div>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="flex justify-center items-center p-8">
            <Loader2 className="w-8 h-8 animate-spin" />
          </div>
        ) : (
          <>
            <div className="rounded-md border overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>
                      <SortHeader column="address" label="Address" />
                    </TableHead>
                    <TableHead>
                      <SortHeader column="description" label="Description" />
                    </TableHead>
                    <TableHead>
                      <SortHeader column="location_latitude" label="Latitude" />
                    </TableHead>
                    <TableHead>
                      <SortHeader
                        column="location_longitude"
                        label="Longitude"
                      />
                    </TableHead>
                    <TableHead>
                      <SortHeader column="date_created" label="Date Created" />
                    </TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {paginatedData.map((location) => (
                    <TableRow key={location._id}>
                      <TableCell className="font-medium max-w-xs truncate">
                        {location.address}
                      </TableCell>
                      <TableCell className="max-w-xs truncate">
                        {location.description}
                      </TableCell>
                      <TableCell>{location.location_latitude}</TableCell>
                      <TableCell>{location.location_longitude}</TableCell>
                      <TableCell className="whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4" />
                          {formatDate(location.date_created)}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() =>
                            viewOnMap(
                              location.location_latitude,
                              location.location_longitude
                            )
                          }
                        >
                          <MapPin className="w-4 h-4 mr-2" />
                          View on Map
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            {renderPagination()}
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default ListBins;
