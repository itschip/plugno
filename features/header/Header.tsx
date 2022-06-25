import { AppShell, Button, Header, Text } from "@mantine/core"
import React, { ReactNode } from "react"

interface HeaderProps {
  children: ReactNode;
}

const AppHeader: React.FC<HeaderProps> = ({ children }) => {
  return (
    <AppShell
      padding="md"
      header={
        <Header sx={{ alignItems: 'center', display: 'flex', justifyContent: 'space-between' }} height={60} p="xs">
          <div>
            <Text color="indigo" size="xl" weight={500}>Plug.no</Text>
          </div>
          <div style={{ display: 'flex', gap: 5 }}>
            <Button variant="white" color="dark">
              Log in
            </Button>
            <Button
              color="indigo"
            >
              Sign up
            </Button>
          </div>
        </Header>
      }
    >
      {children}
    </AppShell>
  )
}

export default AppHeader;