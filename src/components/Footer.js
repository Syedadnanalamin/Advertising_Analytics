import React from "react";

export default function Footer() {
  return (
    <footer className="border-t border-white/5 py-6 px-6 text-center text-xs text-zinc-600 font-medium max-w-7xl mx-auto w-full mt-12 print:hidden">
      <div>
        © {new Date().getFullYear()} Boost House Agency. All rights reserved. Campaign Insights Portal.
      </div>
    </footer>
  );
}
