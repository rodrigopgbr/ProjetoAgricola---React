import { createGlobalStyle } from 'styled-components';
import 'react-toastify/dist/ReactToastify.css';

export default createGlobalStyle`

*:focus{
  outline:0;
}

html, body ,#root{
  height:100%;
  margin:0;
  font-family:"Roboto";
  color:#262626;
}

.fullWidth,
.fullHeight{
  width:100%;
}


.btn-primary{
  color:#fff!important;
  background-color:#198D5E!important;
  &:hover{
    background-color:#14754e!important;
  }
}

.btn-outline{
  color:#198D5E!important;
  border:1px solid #198D5E;
  &:hover{
    background-color:#198d5e1a!important;
  }
}
.btn-link{
  color:#198D5E!important;
}

.typography-title-content{
  margin-top:29px;
  margin-bottom:20px;
  padding-left: 10px;
  font-size:25px;

  &.no-margin-bottom{
    margin-bottom:0px;
  }
}

.MuiTabs-indicator{
  background-color:#198D5E!important;
}

.form-spacing{
  margin: auto;
  width: 100%;
}
.form-spacing > .MuiGrid-item{
  padding: 12px 12px;
}

.container-table{
  margin-top: 45px;
}

.MuiGrid-spacing-xs-3{
  margin: auto;
}

.MuiSelect-selectMenu{
  min-height: 0.1876em;
}
.MuiSelect-outlined.MuiSelect-outlined{
  padding: 10px 30px 27px 15px;
}

.MuiInputBase-input{
  height:0.1876em;
  padding: 18.5px 14px;
}
.MuiInputLabel-outlined{
  transform: translate(14px, 12px) scale(1);
}

.MuiFormControl-root.MuiErrorMask fieldset.MuiOutlinedInput-notchedOutline {
    border-color: #f44336;
}

.MuiFormControl-root.MuiErrorMask label{
  color:#f44336;
}

.MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline{
  border-color: #000!important;
  border-width: 1px!important;
}

.inputMod{
  width:100%;
}
.Mui-focused.MuiInputLabel-outlined{
  color: #000!important;
}

.react-checkbox-tree label {
  display: flex;
  align-items: center;
}

.MuiTabs-flexContainer {
    position: absolute;
}

li.rct-node.rct-node-leaf{
  padding-left: 10px!important;
}

/* width */
::-webkit-scrollbar {
  width: 10px;
}

/* Track */
::-webkit-scrollbar-track {
  box-shadow: inset 0 0 5px #10101042;
  border-radius: 7px;
}

/* Handle */
::-webkit-scrollbar-thumb {
    border-radius: 10px;
    box-shadow: inset 0 0 6px rgb(0 0 0 / 30%);
    -webkit-box-shadow: inset 0 0 6px rgb(0 0 0 / 30%);
    border-radius: 10px;
    background-color: #F5F5F5;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #198d5e;
}

`;
