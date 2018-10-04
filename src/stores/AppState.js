export default class AppState {
  handleNetworkConnectionIssue = () => {
    this.alert.title = 'There was a network error making a request. Please try again later. SORRY!';
  }
}
