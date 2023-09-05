import express from "express";
import GoogleStrategy from "passport-google-oauth20";
import passport from "passport";
import { getEnv } from "src/utils/general";

class SocialAuthController {
  static async google() {
    passport.use(
      // @ts-ignore
      new GoogleStrategy(
        {
          clientID: getEnv("GOOGLE_CLIENT_ID"),
          clientSecret: getEnv("GOOGLE_CLIENT_SECRET"),
          callbackURL: getEnv("GOOGLE_CALLBACK_URL"),
        },
        function (accessToken, refreshToken, profile, cb) {
          //   User.findOrCreate({ googleId: profile.id }, function (err, user) {
          //     return cb(err, user);
          //   });
        }
      )
    );
  }
}
