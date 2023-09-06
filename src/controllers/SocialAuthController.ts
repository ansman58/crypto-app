import express from "express";
import * as GoogleStrategy from "passport-google-oauth20";
import { getEnv } from "../utils/general";
export class SocialAuthController {
  static googleAuth() {
    return new GoogleStrategy.Strategy(
      {
        clientID: getEnv("GOOGLE_CLIENT_ID"),
        clientSecret: getEnv("GOOGLE_CLIENT_SECRET"),
        callbackURL: getEnv("GOOGLE_CALLBACK_URL"),
      },
      (accessToken, refreshToken, profile, done) => {
        console.log(profile);
        done();
      }
    );
  }
}
