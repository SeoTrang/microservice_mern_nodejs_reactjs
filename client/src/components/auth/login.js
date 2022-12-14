import React from 'react'

import { Navigate, useNavigate } from 'react-router-dom'

import axios from 'axios'

import { useForm } from 'react-hook-form'

import { useCookies } from 'react-cookie';






function Login() {


    let navigate = useNavigate()

 


    const { register, handleSubmit, getValues } = useForm();

    const [cookies, setCookie] = useCookies(['user']);
        
    async function postValue(){


        
        try {
            let data = {
                email : await getValues("email"),
                psw : await getValues("psw")
              }

              if( data.email != '' && data.psw != ''){
                console.log("da vao")
                axios.post('http://localhost:7000/login', {
                  data
                })
                .then(async function (response) {
                //   console.log(response);
                    if(response.data === 'failed'){
                        return alert('tai khoang hoat mat khau khong hop le !!!')

                    }else{
                        // return alert('dang nhap thanh cong')
                        console.log(response);
                      await  setCookie('accesstoken', response.data.accesstoken, { path: '/' });
                      await  setCookie('refreshtoken', response.data.refreshtoken, { path: '/' });
                    
                      return navigate('/')

                    }


                //   return navigate('/')
                })
                .catch(function (error) {
                  console.log(error);
                });
              } else{
                // console.log('not ok !');
                alert('vui long nhap du thong tin ')
              }
        } catch (error) {
            console.log(error);
        }
    }



    return (
        <div className='login'>
           <div class="modal-content animate" >
                <div class="imgcontainer">
                
                <img src="https://ict-imgs.vgcloud.vn/2020/09/01/19/huong-dan-tao-facebook-avatar.jpg" alt="Avatar" class="avatar"/>
                </div>



                <div class="container">
                <label for="uname"><b>Email</b></label>
                <input {...register("email")} type="text" placeholder="Nh???p email" />

                <label for="psw"><b>M???t kh???u</b></label>
                <input {...register("psw")} type="password" placeholder="Nh???p m???t kh???u" />
                    
                <button className='btn_login' type="submit" onClick={postValue}>????ng nh???p</button>
                <label>
                    Ghi nh???
                </label>
                <input type="checkbox" checked="checked"/> 
                </div>

                <div class="container container-end" style={{backgroundColor:"#f1f1f1"}}>
                <button type="button" class="cancelbtn" >Cancel</button>
                <span class="psw">Qu??n <a className='fogot' href="#">m???t kh???u?</a></span>
                </div>
            </div>
            
        </div>
    )
}

export default Login
