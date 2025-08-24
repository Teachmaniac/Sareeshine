/**
 * The Footer component for the SareeShine website.
 * It displays the copyright information and cultural taglines at the bottom of the page.
 */
export default function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="bg-background py-8 mt-16 border-t">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="mb-4">
          <p className="text-lg font-headline text-primary">
            "कला का कोई मोल नहीं, वापसी की कोई गुंजाइश नहीं।"
          </p>
          <p className="text-md text-muted-foreground mt-2 max-w-2xl mx-auto">
            "हर धागे में भारत की आत्मा, हर साड़ी में हमारी पहचान। आज ही खरीदें, कल शायद ये नहीं मिलेगी।"
          </p>
        </div>
        <p className="text-sm text-muted-foreground mt-6">
          &copy; {currentYear} SareeShine. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
