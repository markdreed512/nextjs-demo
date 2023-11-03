import Head from 'next/head';
import { MongoClient } from "mongodb";
import { Fragment } from "react";

import MeetupList from "../components/meetups/MeetupList";

function HomePage(props) {
  return (
    <Fragment>
      <Head>
        <title>React Meetups</title>
        <meta name="description" content="meta content"></meta>
      </Head>
      <MeetupList meetups={props.meetups} />
    </Fragment>
  );
}

// export async function getServerSideProps(context){
//   const req = context.req
//   const res = context.res
//   // fetch data...
//   return {
//     props: {
//       meetups: DUMMY_MEETUPS
//     }
//   }
// }

export async function getStaticProps() {
  const client = await MongoClient.connect(
    "mongodb+srv://cdmarkemailtest:n3AazDH3OX8KJ2WU@cluster0.llsqyvn.mongodb.net/meetups?retryWrites=true&w=majority"
  );
  const db = client.db();

  const meetupsCollection = db.collection("meetups");

  const meetups = await (await meetupsCollection.find().toArray());

  console.log("meetups: ", meetups);
  client.close();

  return {
    props: {
      meetups: meetups.map((meetup) => ({
        title: meetup.data.title,
        address: meetup.data.address,
        image: meetup.data.image,
        id: meetup._id.toString(),
      })),
    },
    revalidate: 10,
  };
}

export default HomePage;
