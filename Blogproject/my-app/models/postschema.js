import { Schema, model, models } from "mongoose";

const postschema = new Schema ({
    title: String,
    description: String,
    image: String,
    createdAt:String

},{toJSON: {virtuals: true}})


postschema.virtual('short_description').get(function(){
    return this.description.substr(0,100) + "...."
})

postschema.virtual('createdAt_formated').get(function(){
    return changeDateFormat(this.createdAt)
})

function changeDateFormat (date_str){
    const date = new Date(date_str);
    const Months = ["January", "February", "March", "April" , "May" , "June" , "July", "August", "September", "October", "November", "December"]
    
    return `${Months[date.getMonth()]} ${Months[date.getDate()]} ${Months[date.getFullYear()]}`
}



const PostModel = models.Post || model("Post", postschema);

export default PostModel;


