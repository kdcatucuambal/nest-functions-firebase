// import * as functions from "firebase-functions";
// import * as admin from "firebase-admin";

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript

// admin.initializeApp();
// admin.firestore().settings({ timestampsInSnapshots: true })


// export const helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", { structuredData: true });
//   console.log("Hello console.log");
//   response.send("Hello from Firebase!");
// });

// export const savePost = functions.https.onRequest(async (request, response) => {
//   const { title, content } = request.body;
//   const post = { title, content };
//   const newPost = await admin.firestore().collection("posts").add(post);
//   response.send(newPost);
// });

// export const createUser = functions.auth.user().onCreate((user) => {
//     return admin.firestore().collection("users").doc(user.uid).set({
//     email: user.email,
//     name: user.displayName,
//     createdAt: admin.firestore.FieldValue.serverTimestamp(),
//   });
// });

import * as functions from 'firebase-functions';
import { NestFactory } from '@nestjs/core';
import { ExpressAdapter } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import express from 'express';
import * as admin from 'firebase-admin';
import { ValidationPipe } from '@nestjs/common';

admin.initializeApp();
admin.firestore().settings({ timestampsInSnapshots: true })

const server = express();

const createNestServer = async (expressInstance) => {
  const app = await NestFactory.create(
    AppModule,
    new ExpressAdapter(expressInstance),
  );
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe());
  return app.init();
};


createNestServer(server)
    .then(v => console.log('Nest Ready'))
    .catch(err => console.error('Nest broken', err));

    
functions.firestore.document('posts/{postId}').onCreate(async (snap, context) => {
    const post = snap.data();
    const postId = context.params.postId;
    const postRef = admin.firestore().collection('posts').doc(postId);
    await postRef.update({ valueAutoIncrement: admin.firestore.FieldValue.increment(1) });
    return post;
});

//Functions to be exported    
export const postAPI = functions.https.onRequest(server);

