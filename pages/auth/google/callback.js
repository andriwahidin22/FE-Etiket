import { useEffect } from "react";
import { useRouter } from "next/router";
import { setCookie } from "cookies-next";
import jwtDecode from "jwt-decode";

export default function GoogleCallback() {
  const router = useRouter();
  const { token } = router.query;

  useEffect(() => {
    if (token) {
      setCookie("token", token, { maxAge: 60 * 60 * 24, path: "/" });

      const decoded = jwtDecode(token);
      const role = decoded.role ? decoded.role.toUpperCase() : "";

      setCookie("role", role, { maxAge: 60 * 60 * 24, path: "/" });

      if (role === "ADMIN") {
        router.push("/admin");
      } else {
        router.push("/");
      }
    }
  }, [token, router]);

  return <p className="text-center mt-20">Memproses login dengan Google...</p>;
}
