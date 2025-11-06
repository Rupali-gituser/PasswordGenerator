import { useState ,useCallback,useEffect,useRef} from 'react'
import './App.css'

function App() {
  const [len,setLen]=useState(8);
  const[numAllo,setNumAllo]=useState(false);
  const[charAllo,setcharAllo]=useState(false);
  const[password,setPassword]=useState('');
  const passwordRef=useRef(null);

  const generatePassword=useCallback(()=>{
    let pass=""
    let str="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if(numAllo) str+="0123456789"
    if(charAllo) str+="!@#$%^&*()_+~`|}{[]:;?><,./-="
    for(let i=1;i<len;i++){
      let charIndex=Math.floor(Math.random()*str.length+1)
      pass+=str.charAt(charIndex)
    }
    setPassword(pass)

  },[len,numAllo,charAllo,setPassword]
)


useEffect(()=>{
  generatePassword()
},[len,numAllo,charAllo,generatePassword])


  const copyPasswordToClipboard=useCallback(()=>{
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0,20);
    window.navigator.clipboard.writeText(password)
  },[password]
)

const Alert=()=>{
  alert("Password copy to clipboard")
}
  return(
  <>
  <div className="w-screen h-screen flex justify-center items-center bg-black text-white-500 flex-col gap-4">
    <div className="flex flex-col flex-wrap bg-gray-700 p-6 rounded-2xl shadow-lg text-center font-semibold font-2xl gap-4">Password Generator
      <div className="flex flex-row " >
        <input type="text" value={password} className="bg-white p-2  w-96 text-black  rounded-l-xl" placeholder="password" readOnly ref={passwordRef} />
       <button onClick={ ()=>{
        copyPasswordToClipboard();Alert(); }} 
        className="bg-blue-700 text-white  rounded-r-xl px-3 py-0.5" >copy</button>
      </div>
      <div className="flex items-center font-medium gap-x-2.5">
        <div className="flex justify-between items-center gap-4">
          <input type="range" min={8} max={20} value={len}
          className='cursor-pointer' onChange={(e)=>{setLen(e.target.value)}}/>
          <label>length:{len} </label>
        </div>
        <div className="gap-x-1 flex item-center ">
          <input type="checkbox" id="numberInput" defaultChecked={numAllo} onChange={(e)=>{setNumAllo((prev=>!prev))}}/>
          <label htmlFor="numberInput">Numbers</label>
        </div>
        <div className="flex item-center gap-x-1 ">
          <input type="checkbox" id="numberInput" defaultChecked={charAllo} onChange={(e)=>{setcharAllo((prev=>!prev))}}/>
          <label>Characters</label>
        </div>
      
      </div>
      
    </div>
  </div>

  </>
  )
}

export default App
