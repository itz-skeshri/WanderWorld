const { ref } = require("joi");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Review = require("./reviews.js");

const ListingSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    image: {
        type: String,
        default: "https://t3.ftcdn.net/jpg/02/21/28/00/240_F_221280023_cqXBxKJr0ibEJlljlGRGfL309Ke47mGa.jpg",
        set: (v)=> v===""?"https://t3.ftcdn.net/jpg/02/21/28/00/240_F_221280023_cqXBxKJr0ibEJlljlGRGfL309Ke47mGa.jpg":v
    },
    price: {
        type: Number
    },
    location: {
        type: String
    },
    country: {
        type: String
    },
    reviews:[
        {
            type: Schema.Types.ObjectId,
            ref: "Review"
        }
    ]
});

ListingSchema.post("findOneAndDelete",async(listing)=>{
    if(listing){
        await Review.deleteMany({_id: {$in: listing.reviews}});
    }

});

const Listing = mongoose.model("Listing",ListingSchema);
module.exports = Listing;
