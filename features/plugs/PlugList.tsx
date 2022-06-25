import { Badge, Box, Card, Grid, Group, Text, useMantineTheme, Button } from "@mantine/core"
import React from "react";
import { PlugListingItem } from "../../types/plugs";

interface PlugListProps {
  plugs: PlugListingItem[];
}

const PlugList: React.FC<PlugListProps> = ({ plugs }) => {
  const theme = useMantineTheme();

  if (!plugs) return null;

  return (
    <Grid>
      {plugs.map((plug) => {
        const plugStatus: string = plug.connected && plug.busy
          ? 'Busy'
          : plug.connected
          ? 'Connected'
          : 'Disconnected';

        const plugStatusColor: string = plug.connected && plug.busy
        ? 'red'
        : plug.connected
        ? 'green'
        : 'gray';

        return (
        <Grid.Col key={plug.id} span={4}>
          <Card 
            p="lg"
            sx={(theme) => ({
              backgroundColor: theme.colors.gray[0],
            })}
          >
            <Group position="apart" style={{ marginTop: theme.spacing.sm }}>
              <Box>
                <Text>{plug.name}</Text>
              </Box>
              <Badge color={plugStatusColor}>{plugStatus}</Badge>
            </Group>
            <Text color="gray" size="sm">{plug.location}</Text>
            
            <Box mt={10}>
              <Button fullWidth color="indigo" variant="light">Send message</Button>
            </Box>
          </Card>
      </Grid.Col>
      )})}
    </Grid>
  )
}

export default PlugList;