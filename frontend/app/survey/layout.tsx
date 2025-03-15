import { UserDataContextProvider } from "@/context/UserDataContext";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <UserDataContextProvider>
      {children}
    </UserDataContextProvider>
  );
}
