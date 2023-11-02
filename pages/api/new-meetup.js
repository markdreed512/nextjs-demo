import { MongoClient } from 'mongodb'
async function handler(req, res){
    if(req.method === 'POST'){
        const data = req.body

        const client = await MongoClient.connect('mongodb+srv://cdmarkemailtest:n3AazDH3OX8KJ2WU@cluster0.llsqyvn.mongodb.net/meetups?retryWrites=true&w=majority')
        const db = client.db()

        const meetupsCollection = db.collection('meetups')

        const result = await meetupsCollection.insertOne({data})

        console.log(result)

        client.close()

        res.status(201).json({message: 'Meetup inserted!'})
    }
}

export default handler