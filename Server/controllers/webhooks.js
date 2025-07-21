// import { Webhook } from "svix";
// import User from "../models/User.js";

// //API COntroller function to manage clerk user with database

// export const clerkWebhooks = async (req,res)=>{
//     try {
//         const whook = new Webhook(process.env.CLERK_WEBHOOK_SECRET)

//         await whook.verify(JSON.stringify(req.body),{
//             "svix-id" :req.headers["svix-id"],
//             "svix-timestamp":req.headers["svix-timestamp"],
//             "svix-signature":req.headers["svix-signature"]
//         })
//         const {data,type} =req.body
//         switch(type){
//             case 'user.created':{
//                 const userData = {
//                     _id:data.id,
//                     email:data.email_addresses[0].email+email_address,
//                     name:data.first_name+" "+data.last_name,
//                     imageUrl:data.image_url,
//                 }
//                 await User.create(userData)
//                 res.json({})
//                 break;
//             }
//             case 'user.updated':{
//                 const userData = {
//                    email:data.email_addresses[0].email+email_address,
//                     name:data.first_name+" "+data.last_name,
//                     imageUrl:data.image_url,   
//                 }
//                 await User.findByIdAndUpdate(data.id, userData)
//                 res.json({})
//                 break;
//             }
//             case 'user.deleted':{
//                 await User.findByIdAndDelete(data.id)
//                 res.json({})
//                 break;
//             }
            
//             default:
//                 break;    
//         }

//     } catch (error) {
//         res.json({success:false,message:error.message})
//     }
// }

import { Webhook } from "svix";
import User from "../models/User.js";

// API Controller function to manage Clerk user with database
export const clerkWebhooks = async (req, res) => {
  try {
    const whook = new Webhook(process.env.CLERK_WEBHOOK_SECRET);

    // Verify the incoming webhook
    await whook.verify(JSON.stringify(req.body), {
      "svix-id": req.headers["svix-id"],
      "svix-timestamp": req.headers["svix-timestamp"],
      "svix-signature": req.headers["svix-signature"],
    });

    const { data, type } = req.body;

    switch (type) {
      case "user.created": {
        const userData = {
          _id: data.id,
          email: data.email_addresses[0].email_addresses,
          name: data.first_name + " " + data.last_name,
          imageUrl: data.image_url,
        };

        await User.create(userData);
        res.json({})
        // console.log("User created:", userData);
        // res.status(201).json({ success: true });
        break;
      }

      case "user.updated": {
        const updatedData = {
          email: data.email_addresses[0].email,
          name: `${data.first_name} ${data.last_name}`,
          imageUrl: data.image_url,
        };

        await User.findByIdAndUpdate(data.id, updatedData, { new: true });
        console.log("User updated:", updatedData);
        res.status(200).json({ success: true });
        break;
      }

      case "user.deleted": {
        await User.findByIdAndDelete(data.id);
        console.log("User deleted:", data.id);
        res.status(200).json({ success: true });
        break;
      }

      default:
        console.log("Unhandled event type:", type);
        res.status(200).json({ success: true, message: "Unhandled event" });
        break;
    }
  } catch (error) {
    console.error("Webhook error:", error.message);
    res.status(400).json({ success: false, message: error.message });
  }
};
