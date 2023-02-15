import React,{useState} from 'react';
import { images } from '@/constants';
import { AppWrap,MotionWrap } from '@/wrapper';
import { client } from '@/client'; 
import styles from "./Footer.module.scss";

type Props = {}

function Footer({}: Props) {

  const [formData, setFormData] = useState<{name : string,email : string,message : string}>(
    { name : "",email : "",message : ""}
  );
  const [isFormSubmitted, setIsFormSubmitted] = useState(false); 
  const [loading, setLoading] = useState(false);

  const handleChangeinput = (e : React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>  ) => {
    const {name  , value} = e.target;
    setFormData({...formData,[name] : value});
  }

  const handleSubmit = () => {
    setLoading(true);
      const contact = {
        _type : "contact",
        ...formData
      }

      console.log(contact);
    setLoading(false);
  }

  return (
    <>
        <h2 className='head-text'>
              Take a coffee & chat with me
        </h2>
        <div className={styles.app__footer_cards}>
            <div className={styles.app__footer_card}>
                <img 
                src={images.email.src} 
                alt="email" />

                <a href="mailto:Ghostrex2@gmail.com" className='p-text'>
                  Ghostrex2@gmail.com
                </a>
            </div>
            <div className={styles.app__footer_card}>
                <img 
                src={images.mobile.src} 
                alt="email" />

                <a href="tel: +261 (33) 64-986-49" className='p-text'>
                  +261 33 64 986 49
                </a>
            </div>
        </div>
        <div className={`${styles.app__footer_form} app__flex `}>
            <div className='app__flex'>
                  <input 
                      className='p-text' 
                      type="text" 
                      placeholder='Your Name' 
                      name='name'
                      value={formData.name} onChange={handleChangeinput}   />
            </div>
            <div className='app__flex'>
                  <input 
                      className='p-text' 
                      type="email" 
                      placeholder='Your Email' 
                      name='email'
                      value={formData.email} onChange={handleChangeinput}   />
            </div>
            <div>
                <textarea 
                    className='p-text'
                    placeholder='Your Message'
                    name="message"
                    value={formData.message} onChange={handleChangeinput}
                />
            </div>
            <button
              type='button'
              className='p-text'
              onClick={handleSubmit}
              >
                {loading ? "Sending ..." : "Send Message"}
            </button>
        </div>
    </>
  )
}

export default AppWrap(
  MotionWrap(Footer,styles.app__footer),
  "contact",
  "app__whitebg");