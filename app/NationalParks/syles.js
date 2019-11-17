import { StyleSheet, Dimensions } from 'react-native';

export const { width } = Dimensions.get("window");
// card dimensions 3:2 (w:h)
// card image dimensions 9:2 (w:h)
export const CARD_WIDTH = width / 4 * 3;
export const CARD_HEIGHT = CARD_WIDTH / 3 * 2;

const styles = StyleSheet.create({
  mapContainer: {
    flex: 1,
  },
  container: {
    flex: 1,
    margin: 40,
    // width: width,
    // borderRadius: 4,
    // borderWidth: 0.5,
    // borderColor: '#d6d7da',
  },
  title: {
    fontSize: 19,
    fontWeight: 'bold',
  },
  activeTitle: {
    color: 'red',
  },
  mapStyle: {
    ...StyleSheet.absoluteFillObject,
  },
  card: {
    elevation: 2,
    backgroundColor: "#FFF",
    marginHorizontal: 7,
    shadowColor: "#000",
    shadowRadius: 5,
    shadowOpacity: 0.3,
    shadowOffset: { x: 2, y: -2 },
    height: CARD_HEIGHT,
    width: CARD_WIDTH,
    borderRadius: 5,
    overflow: "hidden",
  },
  textContent: {
    flex: 1,
  },
  cardimage:{
    padding: -5,
    width: CARD_WIDTH,
    height: CARD_HEIGHT / 3,

  },
  cardtitle: {
    padding: 5,
    fontFamily: "Roboto",
    fontSize: 18,
  },
  cardDescription: {
    paddingLeft: 5,
    fontSize: 12,
    color: "#757575",
  },
  scrollView: {
    position: "absolute",
    bottom: 30,
  },
  endPadding: {
    paddingRight: 30,
    paddingLeft: 40,
  },
});

export default styles;
