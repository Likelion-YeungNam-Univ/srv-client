import React, {useCallback, useState} from "react";
import { useEffect } from "react";
import { SignInForm } from "../../styles/Login.styled";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

const JoinForm = () => {

    const navigate = useNavigate();

    const initData = Object.freeze({// freeze-객체를 동결하기 위해서
        name:'',
        email: '',
        id: '',
        pswd: '',
        checkPswd: '',
    });
    
    const [data, updataData] = useState(initData);
    const [name, updataName] = useState(initData.name);

    const [email, updataEmail] = useState(initData.email);
    const [id, updataId] = useState(initData.id);
    const [pswd, setPswd] = useState(initData.pswd);//비밀번호
    const [checkPswd, setCheckPswd] = useState(initData.setCheckPswd);

    const [pswdMessage, setPswdMessage] = useState("");
    const [checkPswdMessage, setCheckPswdMessage] = useState("");//비밀번호오류메세지 상태

    const [isPswd, setIsPswd] = useState(false);
    const [isCheckPswd, setIsCheckPswd] = useState(false);//비밀번호 유효성 검사
    const [color, updataColor] = useState("#b8e8ff")

    useEffect(() => {
        if( data.name.length > 0 && data.email.length > 0 &&
            data.id.length > 0 && data.pswd.length > 0 &&
            data.checkPswd.length > 0) {
            updataColor("#95DDFF");
        } else {
            updataColor("#b8e8ff");
        }
    }, [data])


    const SignUpDB = (e) => {//회원가입 api 호출
        e.preventDefault();

        axios.post("/users/",{
            
            "user_name": data.name,
            "email": data.email,
            "id": data.id,
            "password": data.pswd
        })
        .then((res) => { //요청 성공했을 때
            console.log(res.data.user_name);
            console.log(res.data.email);
            console.log(res.data.id);
            localStorage.setItem("Token", res.headers.authorization);
            if(res.status === 200) {
                alert("환영합니다!");
                navigate("/LoginPage");
            }
        })
        .catch((res) => {//요청 실패 했을 경우
            console.log("My error:" + res);
            alert("다시 입력해주세요");
        })
    }

    const onChangePwConfirm = (e) => {
        const currentPw = e.target.value;
        setCheckPswd(currentPw);

        //checkPswd에 값 넣어주기
        updataData({
            ...data, "checkPswd" : e.target.value
        })
        
        console.log("pswd : " + data.pswd)
        console.log("curretPw: " + currentPw)
        if(currentPw.length >= 1){
            if(data.pswd !== currentPw) {
                setCheckPswdMessage("비밀번호가 일치하지 않습니다.");
                setIsCheckPswd(false);
                console.log(isCheckPswd)
            } else {
                setCheckPswdMessage("비밀번호가 일치합니다.");
                setIsCheckPswd(true);
            }
        }       
    }

    
    const handleChange = (e) => {
        console.log(e.target.value);
        
        updataData({
            ...data, [e.target.name] : e.target.value
        })
 
    }
    
    const handleSubmit = e => {
        e.preventDefault(); //새로고침방지
        console.log(e.target.value);
    }


    return (
        <SignInForm color={color}>
            <input
             type="text" 
             name="name" 
             placeholder="이름" 
             value={data.name}
             required 
             onChange={handleChange}/>
            <input
             type="email" 
             name="email" 
             placeholder="이메일" 
             value={data.email}
             required 
             onChange={handleChange}/>
            <input 
             type="text" 
             name="id" 
             placeholder="아이디" 
             value={data.id}
             required 
             onChange={handleChange}/>
            
             <input
             type="password" 
             name="pswd" 
             placeholder="비밀번호"
             onChange={handleChange} 
             value={data.pswd}
             required/>

             
             <input
             type="password" 
             name="checkPswd" 
             placeholder="비밀번호 확인" 
             value={data.checkPswd}
             onChange={onChangePwConfirm}
             required/>
             <p>{checkPswdMessage}</p>
             {/*비밀번호확인 입력안됨*/}

            <button className="submitBtn" type="submit" onClick={(SignUpDB)}>회원가입</button>
            {/* handleSubmit => navigate("/") */}
        </SignInForm>
    );
}

export default JoinForm;