// lib/routes.js

export const publicRoutes = [
    "/", 
    "/login", 
    "/register", 
    "/sejarah", 
    "/venue", 
    "/galery", 
    "/contact", 
    "/destination-info"
  ];
  
  export const adminRoutes = [
    "/admin",
    "/admin/data-tiket",
    "/admin/data-koleksi",
    "/admin/data-pemesanan"
  ];
  
  export const buyerRoutes = [
    "/beli/calender",
    "/pembeli/profile"
  ];
  
  export function getRoleRoutes(role) {
    switch (role) {
      case "ADMIN":
        return [...publicRoutes, ...adminRoutes];
      case "BUYER":
        return [...publicRoutes, ...buyerRoutes];
      default:
        return [...publicRoutes];
    }
  }
  