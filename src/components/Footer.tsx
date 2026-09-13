import {
  Instagram,
  WhatsApp,
  EmailOutlined,
  PhoneOutlined,
} from "@mui/icons-material";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-transparent">
      <div className="flex flex-col items-center justify-center px-4 py-10">
        {/* Brand */}
        <h2 className="mb-3 text-sm font-medium tracking-[0.25em] text-zinc-600">
          ANYSTUDIO
        </h2>

        {/* Contact icons */}
        <div className="flex items-center gap-5 text-zinc-500">
          <a
            href="tel:+258876860612"
            aria-label="Phone"
            className="transition-colors duration-200 hover:text-zinc-900"
          >
            <PhoneOutlined sx={{ fontSize: 19 }} />
          </a>

          <a
            href="https://wa.me/message/ZKUISKAMXWQFI1"
            target="_blank"
            rel="noreferrer"
            aria-label="WhatsApp"
            className="transition-colors duration-200 hover:text-zinc-900"
          >
            <WhatsApp sx={{ fontSize: 19 }} />
          </a>

          <a
            href="mailto:anytechsols@gmail.com"
            aria-label="Email"
            className="transition-colors duration-200 hover:text-zinc-900"
          >
            <EmailOutlined sx={{ fontSize: 19 }} />
          </a>

          <a
            href="https://www.instagram.com/any.tech_/"
            target="_blank"
            rel="noreferrer"
            aria-label="Instagram"
            className="transition-colors duration-200 hover:text-zinc-900"
          >
            <Instagram sx={{ fontSize: 19 }} />
          </a>
        </div>

        {/* Copyright */}
        <p className="mt-5 text-[11px] tracking-wide text-zinc-400">
          © {currentYear} AnyStudio. All rights reserved.
        </p>
      </div>
    </footer>
  );
}