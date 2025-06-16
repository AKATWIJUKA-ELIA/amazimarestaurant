"use client"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useEffect, useState } from "react"
import { useSendMail } from '@/hooks/useSendMail';
import useValidateUsername from "@/hooks/useValidateUsername"
import { IoMdEyeOff } from "react-icons/io";
import { IoEye } from "react-icons/io5";
import useCreateUser from "@/hooks/useCreateUser"
import { useRouter } from "next/navigation";
import useSignUpWithGoogle from "@/hooks/useSignUpWithGoogle"
import { CredentialResponse } from "@react-oauth/google";
import {useData} from  '../../app/DataContext';
import {LogoutUser} from "@/lib/actions";

interface user {
        username: string,
        email: string,
        passwordHash: string,
        phoneNumber: string,
}
interface formdata{
        username: string,
        email: string,
        password: string,
        phoneNumber: string,
}
const AccountManagement = ({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"form">)=> {
        const {data} = useData()
        const [Created,setCreated] = useState(false)
        const {createUser} = useCreateUser()
        const [view1,setview1] = useState(false)
        const [view2,setview2] = useState(false)
        const [isSubmitting, setIsSubmitting] = useState(false)
        const[SubmittingError,setSubmittingError] = useState("")
        const [email, setEmail] = useState('');
        const [password1, setPassword1] = useState('');
        const [password1type, setpassword1type] = useState('password');
        const [password2type, setpassword2type] = useState('password');
        const [password2, setPassword2] = useState('');
        const [PasswordError,setPasswordError] = useState(false)
        const [username, setusername] = useState('');
        const [UserNameIsTaken, setUserNameIsTaken] = useState<boolean>(false);
        const [phoneNumber, setPhoneNumber] = useState('');
        const [passwordsDontMatch, setpasswordsDontMatch] = useState(false);
        const [formdata, setformdata] = useState<formdata>({
                username: '',
                email: '',
                password: '',
                phoneNumber: '',
        })
        const [User, setUser] = useState<user>({
                username: "",
                email: "",
                passwordHash:"",
                phoneNumber:"",
        })
        const {SignUpWithGoogle} = useSignUpWithGoogle()
        const router = useRouter()
        const { sendEmail, } = useSendMail();
        const  {CheckUsername} = useValidateUsername()
        const admin = process.env.NEXT_PUBLIC_ADMIN


        const resetUser = () => {
                        setUser({
                                username: "",
                                email: "",
                                phoneNumber: "",
                                passwordHash: "",
                        });
                        
                      };
        const HandleView = (type:string)=>{
                if(type==="password1"){
                        setview1(true)
                        setpassword1type("text")
                }else if(type==="password2"){
                        setview2(true)
                        setpassword2type("text")
                }
                
        }
                const HandleHide = (type:string)=>{
                        if(type==="password1"){
                        setview1(false)
                        setpassword1type("password")
                }else if(type==="password2"){
                        setview2(false)
                        setpassword2type("password")
                }
        }
        const clearForm = ()=>{
                setEmail('');
                setPassword1('');
                setPassword2('');
                setusername('');
                setPhoneNumber('');
                setpasswordsDontMatch(false);
        }
 const ValidateUsername = async (name:string)=>{
        const response = await CheckUsername(name)
          if (!response.success) {
                                setUserNameIsTaken(true)
                                return
                        }
                        setUserNameIsTaken(false)
                        // setusername(name)
 }
  const handleUsernameChange =async (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.toLowerCase();
        setusername(value)
        if(value.length>3){
              await ValidateUsername(value)
        } else{
                setUserNameIsTaken(false)
        }
       
        
};
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        // Allow only digits, +, -, space
        const cleaned = value.replace(/[^0-9+]/g, "");
         setPhoneNumber(cleaned);
};
const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>)=>{
        const value = e.target.value;
        setEmail(value)
}

const handlePassword1Change = (e: React.ChangeEvent<HTMLInputElement>) => {
  const value = e.target.value;
  setPassword1(value);

  const isValidPassword =/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/.test(value);

  if (!isValidPassword) {
    setPasswordError(true);
  } else {
    setPasswordError(false); // Clear error if valid
  }
};

const handlePassword2Change = (e: React.ChangeEvent<HTMLInputElement>)=>{
        const value = e.target.value;
        setPassword2(value)
}

        useEffect(() => {
                if (password1 != password2) {
                        setpasswordsDontMatch(true)
                        return
                }
                setpasswordsDontMatch(false)

                const updateFormData = async () => {
                        setformdata({
                                ...formdata,
                                username: username,
                                email: email,
                                phoneNumber: phoneNumber,
                                password: password1,
                        });
                };

                updateFormData();
        }, [password1, password2, username, email, phoneNumber])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
                  e.preventDefault();
                  setIsSubmitting(true);
                  try {
                        const Res = await createUser({
                                ...User,
                                username: formdata.username,
                                email: formdata.email,
                                phoneNumber: formdata.phoneNumber,
                                passwordHash: formdata.password
                        })
                        const data = await Res.json()
                        if(!data.success){
                                setIsSubmitting(false);
                                setSubmittingError(data.message)
                                return
                        }
                        
                        setCreated(true)
                        const html = ` <!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>Password Reset</title>
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <style>
    .button {
      display: inline-block;
      padding: 14px 28px;
      font-size: 16px;
      color: #fff;
      background-color: #007bff;
      border-radius: 5px;
      text-decoration: none;
      margin: 20px 0;
    }
    .button:hover {
      background-color: #0056b3;
    }
    .container {
      max-width: 480px;
      margin: auto;
      background: #fff;
      border-radius: 8px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.05);
      padding: 32px;
      font-family: Arial, sans-serif;
      color: black;
    }
    .footer {
      font-size: 12px;
      color: #999;
      margin-top: 32px;
      text-align: center;
    }
  </style>
</head>
<body style="background:#f4f4f4;">

  <div class="container">
<a href="https://shopcheap.vercel.app/" > 
<div 
  style="
    background-image: url('https://cheery-cod-687.convex.cloud/api/storage/143325e4-3c05-4b88-82ba-cbbfa7fcd594');
    background-size: contain;  
    background-repeat: no-repeat;
    background-position: center; 
    width: 200px;
    height: 100px;
  "
>
  
</div></a>
    <h2><strong>Welcome to ShopCheap - Thanks for Joining Us</strong></h2>
    <h1 class="" style="color:black" >Hello, <span style="color:blue"> ${formdata.username} </span></h1>
    <h3>Thank you for Joining  ShopCheap! We're thrilled to have you on board.

Subscribe to Our NewsLetter to be the first to receive exclusive updates, tips, promotions, or industry insights. Expect valuable content delivered straight to your inbox .

If you ever have questions or feedback, just reply to this email—we'd love to hear from you!\n

Thanks again for joining us. \n

Best regards,\n
ShopCheap\n
https://shopcheap.vercel.app/</h3>
    <div class="footer">
      &copy; 2025 ShopCheap. All rights reserved.
    </div>
  </div>
</body>
</html>`
                      sendEmail( `${admin}` ,"New User Created", `User ${formdata.username}, was Created `);
                      sendEmail( `${formdata.email}`,"Welcome to ShopCheap", html)
resetUser()
clearForm()
                
                  } catch (error) {
                        // Handle This
                      alert(error)
                  } finally {
                    setIsSubmitting(false);
                    setTimeout(()=>{
                        setCreated(false)
                         setSubmittingError("")
                    },5000)
                  }}

const LogOut  = async ()=>{
        await LogoutUser()
                }

  return (
    <div className="flex justify-center gap-44" >
       
        <div className="flex flex-col gap-24">
                 <div className="flex flex-col gap-2">
                        <h1 className="text-2xl font-bold">Account Settings </h1>
                        <h1>Hello { data.User?.User?.name}</h1>
                 </div>
                 <div className="flex mt-64">
                       <Button variant={"destructive"} 
                        className="w-full hover:cursor-pointer hover:bg-red-400  "
                        onClick={()=>LogOut()}
                        >
                                {isSubmitting?"Submitting":"Logout"}
                                </Button>
                 </div>
        </div>
        <form onSubmit={handleSubmit} className={cn("flex flex-col gap-6", className)} {...props}>
      <div className="flex flex-col items-center gap-2 text-center">
        
        <p className="text-balance text-sm text-muted-foreground">
          Enter your your Details below to Update to your Data
        </p>
        {Created && <p className="text-balance text-sm text-green-500">
          Success !  You acount has been created, please verify your email
        </p> }
        {SubmittingError  && SubmittingError.length>0  && <p className="text-balance text-sm text-red-500">
          Error !  {SubmittingError}
        </p> }
      </div>
      <div className="grid gap-6 border p-6 rounded-lg shadow-lg dark:bg-black bg-slate-100 ">

       <div className="grid grid-cols-2 gap-3">
         <div className="grid gap-2">
          <Label htmlFor="username">Username</Label>
          <Input id="username" 
          type="text"
          value={username}
          onChange={handleUsernameChange}
          minLength={5}
          maxLength={10}
          placeholder="amazima"
           required />
           {username && username.length<5 && <h1 className="text-red-600 text-xs ">username should have atleast 5 characters </h1>}
           {UserNameIsTaken && <h1 className="text-red-600 text-xs "><span className="text-black dark:text-white" >{username}</span> is taken </h1>}
           {!UserNameIsTaken && username.length>4 &&  <h1 className="text-green-600 text-sm "><span className="text-black dark:text-white" >{username}</span> is available </h1>}
        </div>

        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" 
          type="email"
          value={email} 
          placeholder="amazima@gmail.com" 
          required
          onChange={handleEmailChange} 
          />
        </div>
       </div>

        <div className="grid gap-2">
          <Label htmlFor="phoneNumber">Phone Number</Label>
          <Input id="phoneNumber" 
          type="tel" 
          maxLength={13}
          minLength={10}
          value={phoneNumber}
         onChange={handlePhoneChange}
          placeholder="+256123456789"  
          required />
        </div>

        <div className="grid gap-2">
          <div className="flex items-center">
            <Label htmlFor="password">Password</Label>
          </div>
          <div className="relative" >
          <Input 
          id="password" 
          type={password1type}
          maxLength={16}
          minLength={8}
          onChange={handlePassword1Change}
          value={password1}
           required
            />
            {view1 ?(
                <IoEye  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 cursor-pointer" onClick={()=>HandleHide("password1")}  />
                ):(
                        <IoMdEyeOff 
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 cursor-pointer" onClick={()=>HandleView("password1")}
                />
                )}
                </div>
            {PasswordError  &&  <h1 className="text-red-500 text-xs" >Password must be at least 8 characters, include upper and lower case letters, and a number</h1>}
        </div>

                <div className="grid gap-2">
                <Label htmlFor="confirmpassword">Confirm Password</Label>
                <div className="relative">
                <Input
                id="confirmpassword"
                minLength={8}
                maxLength={16}
                type={password2type}
                onChange={handlePassword2Change}
                value={password2}
                required
                className="pr-10" // Add padding to the right to avoid overlap with the icon
                />
                {view2 ?(
                <IoEye  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 cursor-pointer" onClick={()=>HandleHide("password2")}  />
                ):(
                        <IoMdEyeOff
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 cursor-pointer" onClick={()=>HandleView("password2")}
                />
                )}
                </div>
                {passwordsDontMatch && (
                <h1 className="text-red-600 text-sm">passwords don&apos;t match</h1>
                )}
                </div>

        <Button type="submit" disabled={!username || !password1 || !password2|| UserNameIsTaken || PasswordError || passwordsDontMatch} className="w-full bg-gray-900 dark:bg-gold ">
          {isSubmitting?"Submitting":"Update"}
        </Button>
        
      </div>

    </form>
    </div>
  )
}
export default AccountManagement