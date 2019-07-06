import React, { Component } from "react";
import { connect } from "react-redux";
import { emailChanged, passwordChanged, loginUser } from "../../actions";
import { ImageBackground, TouchableOpacity, Platform } from "react-native";
import {
  Container,
  Content,
  Header,
  Card,
  CardItem,
  Text,
  Form,
  Button,
  Input,
  Spinner,
  Item,
  Label,
  Body,
  Thumbnail,
  H3,
  View,
  Grid,
  Col,
  Row,
  StyleProvider
} from "native-base";
import { bindActionCreators } from "redux";
// import Toast from "react-native-toast-native";
import Toast, { DURATION } from "react-native-easy-toast";
import getTheme from "../../theme/components";
import BaseTheme from "../../theme/variables/orangeTheme";

class LoginForm extends Component {
  componentWillMount() {}

  componentDidUpdate(prevProps) {
    if (prevProps.error !== this.props.error) {
      if (this.props.error != "") {
        this.refs.toastText.show(this.props.error);
      }
    }
  }

  onEmailChange(text) {
    this.props.emailChanged(text);
  }

  onPasswordChange(text) {
    this.props.passwordChanged(text);
  }

  onButtonPress() {
    const { email, password } = this.props;
    this.props.loginUser({ email, password });
  }

  onRegisterPress() {
    this.props.navigation.navigate("Register");
  }

  renderButton() {
    if (this.props.loading) {
      return (
        <StyleProvider style={getTheme(BaseTheme)}>
          <View style={{ width: "100%", bottom: "0%" }}>
            <Spinner
              color="#FF5A12"
              style={{ width: 50, alignSelf: "center" }}
            />
          </View>
        </StyleProvider>
      );
    }
    return (
      <StyleProvider style={getTheme(BaseTheme)}>
        <Button
          full
          rounded
          onPress={this.onButtonPress.bind(this)}
          style={{ flex: 1 }}
        >
          <Text>Login</Text>
        </Button>
      </StyleProvider>
    );
  }

  render() {
    return (
      <StyleProvider style={getTheme(BaseTheme)}>
        <Container>
        <Toast ref="toastText" opacity={0.8}  style={{marginLeft:10,marginRight:10,justifyContent: "center",alignItems: "center"}}/>
          <Header>
            <Text style={{ color: "white" }}>Login</Text>
          </Header>
          <ImageBackground
            source={require("../../assets/images/imgLoginBackground.png")}
            style={{ flex: 1, resizeMode: "cover" }}
          >
            <Content>
              <Body style={styles.loginCard}>
                <Thumbnail
                  square
                  large
                  source={require("../../assets/images/imgAppLogo.png")}
                  style={styles.appLogo}
                />
                <H3 style={styles.appLogoText}>Welcome To HRM Geo Tracking</H3>
                <Card style={{ backgroundColor: "transparent" }}>
                  <CardItem style={{ backgroundColor: "transparent" }}>
                    <Form
                      style={{
                        width: "100%",
                        backgroundColor: "transparent"
                      }}
                    >
                      <View style={{ padding: 25 }}>
                      
                        <Item floatingLabel style={{ marginBottom: 15 }}>
                          <Label>Email</Label>
                          <Input
                            onChangeText={this.onEmailChange.bind(this)}
                            value={this.props.email}
                          />
                        </Item>
                        <Item floatingLabel style={{ Height: 70 }}>
                          <Label>Password</Label>
                          <Input
                            secureTextEntry
                            onChangeText={this.onPasswordChange.bind(this)}
                            value={this.props.password}
                          />
                        </Item>
                        <View>
                          <TouchableOpacity
                            style={{ padding: 10 }}
                            onPress={() => {
                              this.refs.toastText.show("Please contact your administrator to reset your password");
                            }}
                          >
                            <Label
                              style={{
                                alignSelf: "flex-end",
                                fontSize: 12
                              }}
                            >
                              forget password?
                            </Label>
                          </TouchableOpacity>
                          
                        </View>
                        <Item style={{ padding: 15 }}>
                          {this.renderButton()}
                        </Item>
                        <View
                          style={{
                            flex: 1,
                            flexDirection: "row",
                            marginBottom: 1
                          }}
                        />
                        
                      </View>
                    </Form>
                  </CardItem>
                </Card>
              </Body>
            </Content>
          </ImageBackground>
        </Container>
      </StyleProvider>
    );
  }
}

const styles = {
  errorTextStyle: {
    fontSize: 20,
    alignSelf: "center",
    color: "red"
  },

  loginCard: {
    flexGrow: 1,
    alignContent: "center",
    alignItem: "center",
    justifyContent: "center"
  },

  appLogo: {
    width: 85,
    height: 95,
    alignSelf: "center",
    marginBottom: 15,
    marginTop: 15
  },

  appLogoText: {
    color: "#FF5A12",
    marginBottom: 20
  },

  LeftLine: {
    borderBottomColor: "white",
    borderBottomWidth: 1,
    zIndex: 1,
    width: "33.5%",
    marginRight: 5
  },

  Text: {
    alignSelf: "center",
    display: "flex",
    width: 96,
    marginTop: -12,
    position: "relative",
    zIndex: 5
  },

  RightLine: {
    borderBottomColor: "white",
    borderBottomWidth: 1,
    zIndex: 10,
    width: "33.5%",
    marginLeft: 5,
    Right: 0
  },

  ToastStyles: {
    height: Platform.OS === "ios" ? 100 : 150,
    color: "red",
    fontSize: 15,
    lineHeight: 2,
    lines: 4,
    borderRadius: 35,
    yOffset: 40
  }
};

const mapStateToProps = state => {
  const { email, password, error, loading } = state.auth;
  return { email, password, error, loading };
};

const mapDispatchToProps = dispatch => {
  return {
    emailChanged: bindActionCreators(emailChanged, dispatch),
    passwordChanged: bindActionCreators(passwordChanged, dispatch),
    loginUser: bindActionCreators(loginUser, dispatch)
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginForm);
