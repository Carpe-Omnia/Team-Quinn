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
  var snippet = ""
  const { classes } = props;
  var query = props.topText ;
  var limit = 3 ;
  var url = `https://en.wikipedia.org/w/api.php?action=query&list=search&prop=info&inprop=url&utf8=&format=json&origin=*&srlimit=${limit}&srsearch=${query}`
  fetch(url)
  .then(res => res.json())
  .then(function(json){
    if (!!json.query.search[0]){
      snippet = json.query.search[0].snippet ;
      console.log(json.query.search[0]) ;
      let title = json.query.search[0].title ;
      let learn_link = `https://en.wikipedia.org/wiki/${title.replace(/ /g,"_")}` ;
      document.getElementById(`learn_more_button_${props.foursquare_id}`).innerHTML = `<a target="_blank" href="${learn_link}">Learn More</a>` ;
      document.getElementById(`snippet_${props.foursquare_id}`).innerHTML = snippet ;
    }
  })
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
                {props.topText}
              </Typography>
              <Typography component="p">
                address: {props.tagline}
              </Typography>
              <Typography component="p" id={`snippet_${props.foursquare_id}`}>
                Searching...
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small" color="secondary">
                Share
              </Button>
              <Button size="small" color="secondary" id={`learn_more_button_${props.foursquare_id}`}>
                Learn More
              </Button>
            </CardActions>
          </Card>
        </MuiThemeProvider>
      </div>
    );

}



export default InfoWindow ;
//export default withStyles(styles)(InfoWindow);
