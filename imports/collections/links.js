import { Mongo } from 'meteor/mongo';
import validUrl from 'valid-url';
import { check, Match } from 'meteor/check';

// run both on server and client
Meteor.methods({
  'links.insert': function(url) {
    // use build-in method check and match, check has basic valid function such as is input a string?
    // use Match to use custom valid check rule, if didn't pass throw error
    check(url, Match.Where(url => validUrl.isUri(url)));

    // ready to save the url
    const token = Math.random().toString(36).slice(-5);
    Links.insert({ url, token, clicks: 0 })
  }
});

export const Links = new Mongo.Collection('links');