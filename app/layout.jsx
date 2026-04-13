export const metadata = {
  title: "Lowe Tax & Advisory",
  description: "Clarity in your taxes. Confidence in your finances."
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
