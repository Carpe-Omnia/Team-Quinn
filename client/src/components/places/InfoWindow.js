import React from 'react';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import { withStyles } from '@material-ui/core/styles/withStyles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent' ;
import CardMedia  from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button/Button';
import Typography from '@material-ui/core/Typography/Typography' ;
import { createMuiTheme } from '@material-ui/core/styles';
import blue from '@material-ui/core/colors/blue';


const styles = {
  card: {maxWidth: 345,},
  media: {height: 0,paddingTop: '56.25%',},
};

const InfoWindow = (props) => {
  const theme = createMuiTheme({
    palette: {
      primary: blue,
      secondary: {
        main: '#00d8ff',
      },
      type: 'dark',
    }
  });
  const { classes } = props;
    return (
      <div>
        <MuiThemeProvider theme={theme} >
          <Card className="card">
            <CardMedia
              className="card-media"
              image="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b8/Bosphorus.jpg/397px-Bosphorus.jpg"
              title="Contemplative Reptile"
            />
            <CardContent>
              <Typography gutterBottom variant="headline" component="h2">
                {props.name}
              </Typography>
              <Typography component="p">
                address: {props.address}
              </Typography>
              <Typography component="p" >
                delivery status: {props.status}
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small" color="secondary">
                Edit (upcoming)
              </Button>
              <Button size="small" color="secondary">
                Destroy (upcoming)
              </Button>
            </CardActions>
          </Card>
        </MuiThemeProvider>
      </div>
    );

}



export default InfoWindow ;
//export default withStyles(styles)(InfoWindow);
