/**
 * The Footer component for the SareeShine website.
 * It displays the copyright information at the bottom of the page.
 */
export default function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="bg-background py-6 mt-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-center text-sm text-muted-foreground">
          &copy; {currentYear} SareeShine. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
