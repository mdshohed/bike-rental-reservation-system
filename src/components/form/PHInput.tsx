import { Input } from "antd";
import { Controller } from "react-hook-form";

type TInputProps = {
  type: string, 
  name: string, 
  lavel?: string,
}

const PHInput = ({type, name, lavel}: TInputProps) => {
  return (
    <div style={{marginBottom: '20px'}}>  
      { lavel ? lavel : null}
      <Controller 
        name={name} 
        render={({field}) =>(
          <Input {...field} type={type} id={name}/>
        )}
      >

      </Controller>
    </div>
  )

};

export default PHInput;