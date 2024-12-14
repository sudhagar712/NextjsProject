import connectMongo from "@/utils/connectMongo";
import EnquiryModel from "@/models/enquirymodel"


export async function POST (req){

try{
 const { name, email, message } = await req.json();
 const enquiry = { name, email, message };
 await connectMongo();
 await EnquiryModel.create(enquiry);
 return Response.json({ message: "Enquiry has Sent Sucess" });
    }
    catch(error){
        return Response.json({ message: error.message });

    }
   

}