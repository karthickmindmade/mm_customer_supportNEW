import { Pie } from 'react-chartjs-2';
import { Box, Card, CardContent, CardHeader, Divider, Typography, useTheme } from '@mui/material';
import LaptopMacIcon from '@mui/icons-material/LaptopMac';
import PhoneIcon from '@mui/icons-material/Phone';
import TabletIcon from '@mui/icons-material/Tablet';

export default function Piechart(props){
  const {newcount,started,inprogress,completed}=props;
  const theme = useTheme();

  const data = {
    datasets: [
      {
        data: [newcount, started, inprogress,completed],
        backgroundColor: ['#3F51B5', '#e53935', '#FB8C00','black'],
        borderWidth: 8,
        borderColor: '#FFFFFF',
        hoverBorderColor: '#FFFFFF'
      }
    ],
    labels: ['New', 'Started', 'InProgress','Completed']
  };

  const options = {
    animation: false,
   
    layout: { padding: 0 },
    legend: {
      display: true
    },
    maintainAspectRatio: false,
    responsive: true,
    tooltips: {
      backgroundColor: theme.palette.background.paper,
      bodyFontColor: theme.palette.text.secondary,
      borderColor: theme.palette.divider,
      borderWidth: 1,
      enabled: true,
      footerFontColor: theme.palette.text.secondary,
      intersect: false,
      mode: 'index',
      titleFontColor: theme.palette.text.primary
    }
  };

  const devices = [
    {
      title: 'New',
      value: newcount,
      icon: LaptopMacIcon,
      color: '#E53935'
    },
    {
      title: 'started',
      value: started,
      icon: TabletIcon,
      color: '#3F51B5'
    },
    {
      title: 'inprogress',
      value: inprogress,
      icon: PhoneIcon,
      color: '#FB8C00'
    },
    {
      title: 'Completed',
      value: completed,
      icon: PhoneIcon,
      color: 'green'
    }
  ];

  return (
    <Card {...props}>
      <Divider />
      <CardContent>
        <Box
          sx={{
            height: 250,
            position: 'relative'
          }}
        >
          <Pie
            data={data}
            options={options}
          />
        </Box>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            pt: 2
          }}
        >
          {devices.map(({
            color,
            icon: Icon,
            title,
            value
          }) => (
            <Box
              key={title}
              sx={{
                p: 1,
                textAlign: 'center'
              }}
            >
              <Typography
                color="#1976d2"
                variant="body1"
              >
                {title}
              </Typography>
              <Typography
                style={{ color }}
                variant="h6"
              >
                {value}
                %
              </Typography>
            </Box>
          ))}
        </Box>
      </CardContent>
    </Card>
  );
};
