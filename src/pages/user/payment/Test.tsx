import React, { useEffect, useState } from "react";
import loadable from "@loadable/component";

import { Button, Checkbox, message } from "antd";

import { useQuery, useMutation } from "@apollo/client";

import { 
    MutationSetMultiPurchaseInfoByAdminArgs,
    MutationcardPayTest 
} from "src/types";

import { onApolloError } from "src/common/functions";

import { User } from "src/types";

import QUERIES from "src/apis/queries";
import MUTATIONS from "src/apis/mutations";

import "./Test.css";

let endpoint_kooza = "https://we.sellforyou.co.kr/api/";

const LoginModal = loadable(() => import("src/component/sign/login-modal"));
const JoinModal = loadable(() => import("src/component/sign/join-modal"));

declare global {
  interface Window {
    IMP: any;
  }
}

const { IMP } = window;

const Test = () => {
    const [setMultiPurchaseInfoByAdmin] = useMutation<
    { setMultiPurchaseInfoByAdmin: boolean },
    MutationSetMultiPurchaseInfoByAdminArgs
  >(MUTATIONS.SET_MULTI_PURCHASE_INFO_BY_ADMIN);

    const [loginModal, setLoginModal] = useState<boolean>(false);
    const [findModal, setFindModal] = useState<boolean>(false);
    const [joinModal, setJoinModal] = useState<boolean>(false);

    const [accounts, setAccounts] = useState<Array<User>>([]);

    const [payAmountPerMonth, setPayAmountPerMonth] = useState<number>(0);
    const [payAmountPerYear, setPayAmountPerYear] = useState<number>(0);

    const [credit, setCredit] = useState<number>(0);

    const [cardPayTest] = useMutation<
    { cardPayTest : string},
    MutationcardPayTest>(
      MUTATIONS.CARD_PAY_TEST,
      {
        refetchQueries: ["USER_LIST_BY_ADMIN"],
      }
    );
    
    const { data: myInfoData } = useQuery<{ selectMyInfoByUser: User }>(
        QUERIES.SELECT_MY_INFO,
        {
          fetchPolicy: "no-cache",
          onError: onApolloError,
        }
    );

    useEffect(() => {
        if (!myInfoData) {
            return;
        }

        const matched = myInfoData.selectMyInfoByUser.connectedUsers.find((v: any) => v.master);

        if (!matched) {
            return;
        }

        setPayAmountPerMonth(99000);
        setPayAmountPerYear(990000);

        setAccounts([matched]);
    }, [myInfoData]);

    const [pay_type, setPay_type]= useState(0);
    
    const sendForm = async () => {
        let name: any  = document.getElementById('sfy-info-1');
        let type: any = document.getElementById('sfy-info-2');
        let company: any = document.getElementById('sfy-cp-image');

        const pay_body = {
            "email": myInfoData.selectMyInfoByUser.email,
            "password": "sitezero1*",
            "title": "????????? ?????? ?????????",
            "description": credit.toString(),
            "moment": new Date().toISOString(),
            "visit": 0,
            "comment": "",
            "servicetype": pay_type,
            "user": {
                "name": name.value,
                "phone": myInfoData.selectMyInfoByUser.userInfo.phone,
                "company": type.value === 'CASH' ? company.src : "https://www.sellforyou.co.kr/"
            },
            "etc1": type.value,
            "etc2": myInfoData.selectMyInfoByUser.refAvailable ? myInfoData.selectMyInfoByUser.refCode : "",
            "etc3": ""
        }
        
        let pay_resp = await fetch(endpoint_kooza + "query", {
            method: "POST",
            headers: {
            'Content-Type': 'application/json; charset=UTF-8'
            },
            body: JSON.stringify(pay_body)
        });

        let pay_text = await pay_resp.text();

        if (pay_text === 'OK') {
            let email_body = {
                type: 'naver',
                to: 'koozapas@naver.com',
                subject: '[?????????] ????????? ?????? ????????? (' + myInfoData.selectMyInfoByUser.email + ')',
                text: '????????? ?????? ???????????? ?????????????????????. ???????????? ?????? ????????????.'
            };
        
            await fetch(endpoint_kooza + "mail", {
                method: "POST",
                headers: {
                'Content-Type': 'application/json; charset=UTF-8'
                },
                body: JSON.stringify(email_body)
            });

            type.value === "CARD" ? alert("????????? ?????? ???????????????.") : alert("???????????? ?????????????????????.")
            
            window.close();
        } else {
            alert("?????????????????????. ???????????? ????????????.");
        }
    }

    const confirmPay = async () => {
        const purchaseInputs = accounts.map((v: any) => {
            let d = null;

            if (v.purchaseInfo.level > 1) {
                d = new Date(v.purchaseInfo.levelExpiredAt);
            } else {
                d = new Date();
            }

            if (pay_type === 1) {
                d.setMonth(d.getMonth() + 1);
            } else {
                d.setFullYear(d.getFullYear() + 1);
            }

            let date = d.getFullYear()+"-"+('0' + (d.getMonth() +  1 )).slice(-2)+"-"+('0' + d.getDate()).slice(-2);

            return {
                userId: v.id,
                planInfoId: 2,
                expiredAt: new Date(date+" 23:59:59"),
            }
        });

        console.log(purchaseInputs);

        await setMultiPurchaseInfoByAdmin({
            variables: {
                purchaseInputs,
                credit
            },
        }).then(sendForm).catch((e) => {
            message.error(e.message)
        });
    }

    const submit = async () => {
        let name: any  = document.getElementById('sfy-info-1');
        let type: any = document.getElementById('sfy-info-2');
        let company: any = document.getElementById('sfy-cp-image');
        let tos: any = document.getElementById('sfy-info-5');

        if (pay_type === 0) {
            alert("??????????????? ??????????????????.");
            
            return;
        }

        if (!name.value) {
            alert("??????????????? ??????????????????.");
            
            return;
        }

        if (!type.value) {
            alert("??????????????? ??????????????????.");
            
            return;
        }

        if (!company.src) {
            alert("????????????????????? ?????????????????????.");
            
            return;
        }

        if (!tos.checked) {
            alert("????????? ??????????????? ??????????????????.");
            
            return;
        }

        if (type.value === "CARD") {        
            const price = pay_type === 1 ? payAmountPerMonth - credit : pay_type === 2 ? payAmountPerYear - credit : payAmountPerMonth - credit;

            if (price === 0) {
                confirmPay();

                return;
            } else {
                if (price < 100) {
                    alert("?????? ?????? ????????? ?????? 100??? ??????????????? ?????????.");

                    return;
                }
            }

            IMP.init("imp75486003");

            let payInfo ={
                email : myInfoData.selectMyInfoByUser.email,
                level : myInfoData.selectMyInfoByUser.purchaseInfo.level,
                levelExpiredAt : myInfoData.selectMyInfoByUser.purchaseInfo.levelExpiredAt
            }

            IMP.request_pay({
                pg : 'html5_inicis',
                pay_method : 'card',
                merchant_uid: `order_no_${payInfo.email}_${new Date().getTime()}`,
                name : '????????? ??????',
                amount : price,
                buyer_email : payInfo.email,
                buyer_name : name.value,
                buyer_tel : myInfoData.selectMyInfoByUser.userInfo.phone,
                buyer_addr : '??????',
                buyer_postcode : '000-000',
                m_redirect_url : '{??????????????? ?????? ?????? ??? ???????????? ??? URL}'
            }, async function(rsp) {
                if(!rsp.success){
                    alert("????????? ?????????????????????.");

                    return;
                }

                confirmPay();
            });

            return;
        }

        sendForm();
    }

    return (
        <>
            <div style={{
                background: "white",
                padding: 30,
                width: 700,
            }}>
                <div style={{
                    fontSize: "32px", 
                    fontWeight: "bold",
                    marginBottom: 30, 
                    textAlign: "center",
                }}>
                    ????????? ??????
                </div>

                <div style={{
                    fontSize: "18px", 
                    fontWeight: "bold",
                    marginBottom: 10, 
                }}>
                    ?????? ??????
                </div>

                <table style={{marginBottom: 30}}>
                    {myInfoData?.selectMyInfoByUser.connectedUsers.map((v: any) => {
                        return <tr>
                            <td style={{
                                textAlign: "left",
                                width: "100%",
                            }}>
                                <Checkbox checked={accounts.find((w: any) => w.id === v.id) ? true : false} disabled={false} onChange={(e) => {
                                    let pay1 = 0;
                                    let pay2 = 0;

                                    const checked = e.target.checked;

                                    let info = accounts.filter((w: any) => w.id !== v.id);

                                    if (checked) {
                                        info.push(v);
                                    }

                                    if (info.length > 1) {
                                        pay1 = 99000 + (info.length - 1) * 55000;
                                        pay2 = 990000 + (info.length - 1) * 550000;
                                    } else {
                                        pay1 = 99000;
                                        pay2 = 990000;
                                    }

                                    setPayAmountPerMonth(pay1);
                                    setPayAmountPerYear(pay2);

                                    setAccounts(info);
                                }}>
                                    {v.email} ({v.master ? "?????????" : "????????????"})
                                </Checkbox>
                            </td>
                        </tr>
                    })}
                </table>

                <div style={{
                    fontSize: "18px", 
                    fontWeight: "bold",
                    marginBottom: 10, 
                }}>
                    ?????? ??????
                </div>

                {accounts.length > 0 ?
                    <table style={{marginBottom: 30}}>
                        <tr>
                            <td style={{
                                width: "50%",
                            }}>
                                <button id="sfy-pay-1" 
                                    style={{
                                        borderRadius: 5,
                                        fontWeight: "bold",
                                        padding: 10
                                    }}
                                    onClick={()=>{
                                        setPay_type(1);

                                        let target2 =document.getElementById('sfy-pay-1');

                                        target2.style.background = "rgb(215 233 255)";
                            
                                        let target = document.getElementById('sfy-pay-2');
                            
                                        target.style.background = "unset";
                                    }}
                                >
                                    <div style={{color: "coral", fontSize: "16px"}}>
                                        1?????? ?????????
                                    </div>
                                    
                                    <div style={{fontSize: "22px", marginBottom: 5}}>
                                        \ {payAmountPerMonth.toLocaleString('ko-KR')}??? 
                                    </div>
                                    
                                    <div style={{color: "gray", fontSize: "14px"}}>
                                        (???????????????)
                                    </div>
                                </button>
                            </td>

                            <td style={{width: "50%"}}>
                                <button id="sfy-pay-2" 
                                    style={{
                                        borderRadius: 5,
                                        fontWeight: "bold",
                                        padding: 10
                                    }}
                                    onClick={()=>{
                                        setPay_type(2);

                                        let target2 =document.getElementById('sfy-pay-2');

                                        target2.style.background = "rgb(215 233 255)";
                            
                                        let target = document.getElementById('sfy-pay-1');
                            
                                        target.style.background = "unset";
                                    }}
                                >
                                    <div style={{color: "coral", fontSize: "16px"}}>
                                        12?????? ?????????
                                    </div>
                                    
                                    <div style={{fontSize: "22px", marginBottom: 5}}>
                                        \ {payAmountPerYear.toLocaleString('ko-KR')}??? 
                                    </div>
                                    
                                    <div style={{color: "gray", fontSize: "14px"}}>
                                        (???????????????)
                                    </div>
                                </button>
                            </td>
                        </tr>
                    </table>
                    :
                    <div style={{
                        fontWeight: "bold",
                        textAlign: "center",
                        marginBottom: 30
                    }}>
                        ????????? ??????????????????.
                    </div>
                }

                <div style={{
                    fontSize: "18px", 
                    fontWeight: "bold",
                    marginBottom: 10, 
                }}>
                    ?????? ??????
                </div>

                <table style={{marginBottom: 50}}>
                    <tr>
                        <td style={{width: "50%", fontWeight: "bold", textAlign: "left"}}>
                            <span style={{color: "#ff4b4b"}}>
                                *
                            </span>

                            ????????????
                        </td>

                        <td>
                            <input id="sfy-info-1" style={{width: "100%", textAlign: "left"}} />
                        </td>
                    </tr>

                    <tr>
                        <td style={{fontWeight: "bold", width: "50%", textAlign: "left"}}>
                            <span style={{color: "#ff4b4b"}}>
                                *
                            </span>
                            
                            ????????????
                        </td>

                        <td style={{width: "50%", textAlign: "left"}}>
                            {accounts.length > 1 ?
                                <select disabled id="sfy-info-2" defaultValue={"CASH"} style={{
                                    border: "1px solid lightgray",
                                    width: "100%",
                                    height: "30px"
                                }} onChange={(e) => {
                                    const row3: any = document.getElementById('sfy-row-3');
                                    const row4: any = document.getElementById('sfy-row-4');

                                    if (e.target.value === 'CARD') {
                                        row3.style.display = "none";
                                        row4.style.display = "none";
                                    } else {
                                        row3.style.display = "";
                                        row4.style.display = "";
                                    }
                                }}>
                                    <option value={"CASH"}>
                                        ?????? ????????????
                                    </option>
                                </select>
                                :
                                <select id="sfy-info-2" defaultValue={"CASH"} style={{
                                    border: "1px solid lightgray",
                                    width: "100%",
                                    height: "30px"
                                }} onChange={(e) => {
                                    const row3: any = document.getElementById('sfy-row-3');
                                    const row4: any = document.getElementById('sfy-row-4');

                                    if (e.target.value === 'CARD') {
                                        row3.style.display = "none";
                                        row4.style.display = "none";
                                    } else {
                                        row3.style.display = "";
                                        row4.style.display = "";
                                    }
                                }}>
                                    <option value={"CASH"}>
                                        ?????? ????????????
                                    </option>

                                    <option value={"CARD"}>
                                        ??????????????? ??????
                                    </option>
                                </select>
                            }
                        </td>
                    </tr>

                    <tr id="sfy-row-3">
                        <td style={{width: "50%", fontWeight: "bold", textAlign: "left"}}>
                            <span style={{color: "#ff4b4b"}}>
                                *
                            </span>

                            ??????????????????
                        </td>

                        <td>
                            <label id="sfy-info-3-1" className="input-file-button">
                                ????????? ?????????????????? ????????? ???????????????.

                                <input id="sfy-info-3" type="file" accept="image/png, image/jpeg" style={{display: "none"}}
                                    onChange={(e)=>{
                                        const fileList = (e.target).files;

                                        let reader = new FileReader();

                                        reader.onload = function(event: any) {
                                            document.getElementById('sfy-info-3-1').textContent = fileList[0].name;

                                            document.getElementById('sfy-cp-image').style.display = "";
                                            document.getElementById('sfy-cp-image').setAttribute('src', event.target.result);
                                        };

                                        reader.readAsDataURL(fileList[0]);
                                    }}
                                />
                            </label>
                        </td>
                    </tr>

                    <tr id="sfy-row-4">
                        <td style={{width: "40%", fontWeight: "bold", textAlign: "left"}}>                        
                            ????????? ????????????
                        </td>

                        <td>
                            <div style={{width: "100%", minHeight: "32px"}}>
                                <img id="sfy-cp-image" width="50%" src="" style={{display: "none"}} />
                            </div>
                        </td>
                    </tr>
                </table>

                {myInfoData?.selectMyInfoByUser.master ?
                    <>
                        <div style={{
                            fontSize: "18px", 
                            fontWeight: "bold",
                            marginBottom: 10, 
                        }}>
                            ?????? ??? ??????
                        </div>

                        <table style={{marginBottom: 50}}>
                            <tr>
                                <td style={{width: "50%", fontWeight: "bold", textAlign: "left"}}>
                                    ???????????????
                                </td>

                                <td style={{width: "50%", textAlign: "right", fontWeight: "bold"}}>
                                    {myInfoData?.selectMyInfoByUser.credit.toLocaleString('ko-KR')} P
                                </td>
                            </tr>

                            <tr>
                                <td style={{fontWeight: "bold", width: "50%", textAlign: "left"}}>
                                    ???????????????
                                </td>

                                <td style={{width: "50%", textAlign: "left"}}>
                                    <div style={{
                                        display: "flex",
                                        alignItems: "center",
                                    }}>
                                        <input id="sfy-credit" style={{
                                            width: "100%", 
                                            textAlign: "right"
                                        }} />

                                        &nbsp;

                                        <Button id="sfy-submit" style={{
                                            fontSize: 14,

                                            width: "100%",
                                            height: "30px",
                                        }}
                                            onClick={() => {
                                                const point: any = document.getElementById('sfy-credit');
                                                const pointAmount = parseInt(point.value);

                                                if (!pointAmount || isNaN(pointAmount)) {
                                                    setCredit(0);
                                                }

                                                if (pay_type === 1) {
                                                    if (pointAmount > payAmountPerMonth) {
                                                        alert("????????? ???????????? ????????? ??? ????????????.");

                                                        return;
                                                    }
                                                } else {
                                                    if (pointAmount > payAmountPerYear) {
                                                        alert("????????? ???????????? ????????? ??? ????????????.");

                                                        return;
                                                    }
                                                }

                                                setCredit(pointAmount);
                                            }}
                                        >
                                            ????????????
                                        </Button>
                                    </div>
                                </td>
                            </tr>
                        </table>
                    </>
                    :
                    null
                }

                <div style={{
                    background: "whitesmoke",
                    padding: 5,
                    marginBottom: 30
                }}>
                    <label style={{
                        display: "flex",
                        fontWeight: "bold", 
                        alignItems: "center",
                        justifyContent: "center"
                    }}>
                        <input id="sfy-info-5" type="checkbox" />

                        &nbsp;

                        ?????? ????????? ??????????????????,
                        
                        &nbsp;
                        
                        <a target="_blank" href="https://panoramic-butternut-291.notion.site/5090b4282d88479f8608cd7f60bce6c2">????????? ????????????</a>??? ???????????????.
                    </label>
                </div>

                <div style={{
                    marginBottom: "30px"
                }}>
                    <table>
                        <tr>
                            <td style={{
                                fontSize: "16px",
                                fontWeight: "bold",
                                width: "66%",
                                textAlign: "left"
                            }}>
                                ??????????????????:

                                &nbsp;

                                <span id="payPrice">
                                    <span style={{
                                        color: credit > 0 ? "unset" : "coral"
                                    }}>
                                        \ {pay_type === 1 ? payAmountPerMonth.toLocaleString('ko-KR') : payAmountPerYear.toLocaleString('ko-kR')}
                                    </span>

                                    &nbsp;

                                    {credit > 0 ?
                                        <>
                                            - <span style={{
                                                color: "gray"
                                            }}>
                                                \ {credit.toLocaleString('ko-KR')}
                                            </span> = <span style={{
                                                color: "coral"
                                            }}> \ {pay_type === 1 ? 
                                                    (payAmountPerMonth - credit).toLocaleString('ko-KR')
                                                :
                                                    (payAmountPerYear - credit).toLocaleString('ko-KR')}
                                            </span>
                                        </>
                                        :
                                        null
                                    }
                                </span>
                            </td>

                            <td style={{
                                color: "white",
                                fontSize: "16px", 
                                fontWeight: "bold", 
                                width: "33%",
                                textAlign: "right"
                            }}>
                                <Button type="primary" id="sfy-submit" style={{
                                    fontSize: 14,

                                    width: "100%",
                                    height: "34px",
                                }}
                                    onClick={submit}
                                >
                                    ????????????
                                </Button>
                            </td>
                        </tr>
                    </table>
                </div>
                            
                <div style={{
                    background: "whitesmoke",
                    fontWeight: "bold", 
                    padding: 5,
                    marginBottom: 10
                }}>
                    ?????? ?????? ??? ?????? ??????: ???????????? 1005-904-020848 / ???????????? ?????????????????????
                </div>

                <div style={{
                    background: "whitesmoke",
                    fontWeight: "bold", 
                    padding: 5,
                    marginBottom: 10
                }}>
                    ?????? ?????? ??????: ?????? ????????? ?????? ?????? ?????? {">"} ???????????? ?????? ?????? {">"} ?????? ?????? ?????? ?????? {">"} ?????? ?????? ??? ??????
                </div>

                <div style={{
                    background: "whitesmoke",
                    fontWeight: "bold", 
                    padding: 5,
                }}>
                    ?????? ?????? 1????????? ?????? ???????????? ?????????????????? ????????? ?????? ???????????????.
                </div>
            </div>

            <LoginModal
                visible={loginModal}
                closeLoginModal={() => setLoginModal(false)}
                openFindModal={() => setFindModal(true)}
                openJoinModal={() => setJoinModal(true)}
            />
            
            <JoinModal
                visible={joinModal}
                closeJoinModal={() => setJoinModal(false)}
                openLoginModal={() => setLoginModal(true)}
            />
        </>
    );
};

export default Test;