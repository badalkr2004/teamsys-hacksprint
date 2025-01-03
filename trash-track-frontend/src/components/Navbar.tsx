import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import React from 'react';
// import { navigationMenuTriggerStyle } from "@/components/ui/navigation-menu";
// import { ModeToggle } from "@/components/ModeToggle";
import { NavigationMenuLink } from '@/components/ui/navigation-menu';
import { Link } from 'react-router-dom';

// import { AppLogo } from "./AppLogo";

// const components: { title: string; href: string; description: string }[] = [
//   {
//     title: 'Convert Between Notations',
//     href: '/docs',
//     description: 'Easily switch between infix, prefix, and postfix notations.',
//   },
//   {
//     title: 'Evaluate Expressions',
//     href: '/docs',
//     description: 'Quickly compute the results of your expressions.',
//   },
//   {
//     title: 'User-Friendly Interface',
//     href: '/docs',
//     description: 'Intuitive design for seamless navigation and use.',
//   },
//   {
//     title: 'Instant Results',
//     href: '/docs',
//     description: 'Get conversions and evaluations in real-time.',
//   },
//   {
//     title: 'Secure and Private',
//     href: '/docs',
//     description: ' All computations are performed locally in your browser.',
//   },
// ];

export function Navbar() {
  return (
    // w-full flex gap-4 justify-between items-center px-6 py-4  fixed bg-gradient-to-b from-transparent  to-white backdrop-blur-md shadow-md dark:to-gray-800
    <nav className="w-full flex gap-4 justify-between items-center px-6 py-4  dark:to-gray-800 border border-b-green-400">
      <Link to={'./'} className="flex">
        {/* <AppLogo /> */}
        <div className="font-bold text-2xl text-green-800 ">Trash Track</div>
      </Link>

      <div className="flex items-center gap-3">
        <Button className="bg-green-800 text-white">Get Started →</Button>
      </div>
    </nav>
  );
}

const ListItem = React.forwardRef<
  React.ElementRef<'a'>,
  React.ComponentPropsWithoutRef<'a'>
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            'block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground',
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = 'ListItem';
