//Import react
import React, { Component, PropTypes } from 'react'; 

import style from './TermsAndConditions.css'

//Create a component class
export class App extends Component {

  render() {
    // Here goes our page 
    return (
      <div>
            <p className={style.title}>Terms and Conditions</p>
            <strong>OUR COMMITMENT TO YOU</strong>
            <p>The ShaCar Group is an Australia based business providing a variety of vehicles at numerous locations. We are committed to providing quality service and value for money.</p>
            <p>In particular: we provide only current model vehicles; and our vehicles are serviced and maintained in accordance with manufacturers’ recommendations.</p>
            <br />

            <strong>CONSUMER RIGHTS STATEMENT</strong>
            <p>All Your rights set out in this Hire Agreement are in addition to Your rights as a consumer (‘Your Consumer Rights’) under applicable consumer protection legislation, including the Australian Consumer Law.</p>
            <p>Your Consumer Rights are not excluded, restricted or modified by this Hire Agreement. You can find out more about Your Consumer Rights from consumer organisations and bodies such as the Australian Competition and Consumer Commission and State/Territory fair trading authorities.</p>
            <br />
            <strong>YOUR FEEDBACK</strong>
            <p>We welcome Your feedback. Please tell us where we are going wrong by contacting us through our app under the contact us section. (We would also like to hear about what we are doing right).</p>
            <br />
            <strong>INTERPRETING YOUR HIRE AGREEMENT</strong>
            <p>The Hire Agreement between ShaCar and You is made on the date shown on the Hire Document You have accepted in respect of the Vehicle, and is made up of that Hire Document and these Terms and Conditions.</p>
            <p>In these Terms and Conditions:</p>
            <ul>
                  <li>‘Accessory’ means any equipment set out in the Hire Document, including (as applicable) any global positioning system receiver or similar device or any child restraint, booster or similar equipment; </li>
                  <li>ShaCar Insurance Policy’ means a policy of liability insurance held by ShaCar for Your and an Authorised Driver’s liability to a third party for damage to the property of that third party which is caused by the legal use of the Vehicle by You or an Authorised Driver;</li>
                  <li>‘Authorised Driver’ means:
                        <ul>
                              <li> an additional driver who has been permitted by you to drive the vehicle;</li>
                              <li> Your spouse; or our employer or a fellow employee, if either is engaged in activities that are incidental to Your business duties;</li>
                        </ul>
                  </li>
                  <li>‘ShaCar’ means ShaCar Australia Pty Limited ABN TOBEADDED;</li>
                  <li>‘Collection Costs’ means ShaCar’s reasonable costs of collecting unpaid Hire Charges from You (including ShaCar’s legal costs) and ShaCar’s administration fee of $75 (incl GST) and its debt collection agent’s fee equal to 10% of the unpaid Hire Charges;</li>
                  <li>‘Excess Amount’ means the amount shown as ‘Excess Amount’ on the Hire Document;</li>
                  <li>‘Excess Reduction’ means the product called ‘Excess Reduction’ that You may purchase before the hire commences to reduce any excess amount payable;</li>
                  <li>‘Late Return Charge’ means a charge of $40 (incl GST) payable by You if You do not return the Vehicle on the date and by the time shown on the Hire Document or an alternative return date and time as agreed with ShaCar under clause 7.1(a);</li>
                  <li>‘Loss Damage Waiver’ means the loss damage waiver described on the Hire Document as LDW which reduces Your financial responsibility for loss or damage to the Vehicle to the Excess Amount;</li>
                  <li>‘Manufacturer’s Specifications’ means the specifications of the manufacturer of the Vehicle as set out in the Vehicle’s operations manual located in the glove box of the Vehicle;</li>
                  <li>‘Overhead Damage’ means damage (excluding hail damage) to the Vehicle above the top of the door seal or the top of the front and back windscreens, or damage to third party property, caused by the Vehicle coming into contact with any thing overhanging or obstructing its path, objects being placed on the roof of the Vehicle, or You or any person standing or sitting on the roof of the Vehicle;</li>
                  <li>‘Protection Package’ means the package of products called ‘Protection Package’ which includes the Excess Reduction, Personal Accident Insurance and Personal Effects and Baggage Insurance;</li>
                  <li>‘Hire Charges’ means the fees, costs, amounts and charges specified on the Hire Document or payable under this Hire Agreement;</li>
                  <li>‘Hire Period’ means the period commencing on the date shown on the Hire Document (our app) and ending on the date that You return the Vehicle to ShaCar;</li>
                  <li>‘Roadside Assistance Cover’ means, subject to clause 5.4, the provision of the following services for the payment of the Roadside Assistance Cover fee specified in the Hire Document: refuelling up to 6 litres where You run out of fuel, changing flat tyres, provision of spare keys where You lose the keys to the Vehicle, unlocking the Vehicle when You lock the keys in the Vehicle, and provision of a replacement battery or ‘jump start’ where You have a flat battery if You leave the lights, air conditioning, entertainment system(s) or other electrical equipment running while the ignition is off.</li>
                  <li>‘Roadside Assistance Fee’ means a minimum charge of $198 (incl GST), or such other amount as reasonably determined by ShaCar having regard to the roadside assistance callout event (for example: a lost key can cost up to $670 incl GST to replace).</li>
                  <li>‘Substitute Vehicle Insurance’ means a policy of motor vehicle insurance held by You or an Authorised Driver which covers You or the Authorised Driver while using the Vehicle as a substitute for the vehicle insured under that policy;</li>
                  <li>‘Underbody Damage’ means damage to the Vehicle during the Hire Period caused by the Vehicle coming into contact with any thing below the bottom of the door seal and the bottom of the front and rear bumper bars where ShaCar considers, acting reasonably, that the driver of the Vehicle is reasonably at fault for that damage;</li>
                  <li>‘Vehicle’ means the vehicle described on the Hire Document (or any substitute vehicle), and includes its parts, components, keys, remote opening devices, any tag or device for paying electronic tolls, all Accessories and contents supplied by ShaCar;</li>
                  <li>‘You’ or ‘Your’ refers to the person(s) with whom the Hire Agreement is made;</li>
                  <li>‘Your Account’ means Your debit card, credit card or ShaCar charge account to which Your Hire Charges are to be debited.</li>
            </ul>
            <br />

            <strong>DRIVER</strong>
            <p>1.1 You agree and acknowledge that:</p>
            <ul>
                  <li>(a) only You or a Driver authorised by you will drive the Vehicle;</li>
                  <li>(b) You and any Driver authorised by you hold a current licence (not being a learner’s licence or provisional licence) to drive the Vehicle and have been licensed to drive vehicles of the same category as the Vehicle for at least 12 consecutive months.</li>
            </ul>
            <p>1.2 You are responsible for the acts and omissions of an Authorised Driver or any other person You allow to drive the Vehicle and neither You nor any unauthorised driver will have the benefit of the Loss Damage Waiver option or Excess Reduction option (if accepted or included in Your rate) if You allow an unauthorised driver to drive the Vehicle and that unauthorised driver causes loss of or damage to the Vehicle or damage to the property of a third person.</p>
            <br />

            <strong>WHERE YOU CAN AND CANNOT DRIVE THE VEHICLE</strong>
            <p>2.1 You and any Driver authorised by you must only use the Vehicle:</p>
            <ul>
                  <li>(a) on a road which is properly formed and constructed as a sealed, metalled or gravel road (unless the Vehicle is a 4 wheel drive Vehicle and in Western Australia where it may only be used on graded, unsealed roads unless approved in writing);</li>
                  <li>(b) In Western Australia You and any Driver authorised by you must not use the vehicle off road (e.g. on a fire trail, beach, track, grassed area or to cross streams or any other body of water) unless you have authorisation from ShaCar in writing.</li>
            </ul>
            <p>2.2 You and any Driver authorised by you must not, unless authorised in writing by ShaCar, drive or take the Vehicle:</p>
            <ul>
                  <li>(a) to Gove Peninsula or any island off the coast of Australia (including, but not limited to, Bruny Island, Fraser Island, Groote Eylandt, or the Tiwi Islands);</li>
                  <li>(b) to Kangaroo Island; however, if so authorised, You and any Driver authorised by you must not drive the Vehicle between dusk and dawn outside the town limits;</li>
                  <li>(c) into or out of the Northern Territory, Western Australia or Tasmania;</li>
                  <li>(d) in Queensland:
                        <ul>
                              <li>(1) on Highway No. 27: beyond Chillagoe in a Westerly direction;</li>
                              <li>(2) on Highway No. 1: beyond Normanton in a Southerly direction and no further North than Karumba;</li>
                              <li>(3) if the Vehicle is a passenger vehicle or truck, beyond Cooktown to the North or Lakeland to the West and no further North than Cape Tribulation on the Coast Road; or</li>
                              <li>(4) on the Coast Road from Helenvale to Cape Tribulation, or from Laura to Lakeland, unless the Vehicle is a 4 wheel drive vehicle;</li>
                        </ul>
                  </li>
                  <li>(e) in the snow (at any time and anywhere (including Tasmania));</li>
                  <li>(f) above the snow line in:
                        <ul>
                              <li>(1) New South Wales (being Jindabyne); or</li>
                              <li>(2) Victoria (being Bright), from the beginning of June until the end of September;</li>
                        </ul>
                  </li>
                  <li>(g) on beaches or through streams, dams, rivers or flood waters;</li>
                  <li>(h) in Western Australia:
                        <ul>
                              <li>(1) to any parts North of Carnarvon;</li>
                              <li>(2) on the Gibb River Road, Cape Leveque Road, Widdjana Gorge, Canning Stock Route, Gunbarrel Highway and Holland Track;</li>
                              <li>(3) beyond 100 kilometres of the Perth city limits between dusk and dawn;</li>
                              <li>(4) otherwise, outside any town or city limits between dusk and dawn;</li>
                        </ul>
                  </li>
                  <li>(i) in the Northern Territory:</li>
                  <li>(1) on the Jim Jim Falls Road to Jim Jim Falls and Twin Falls;</li>
                  <li>(2) outside any town or city limits between dusk and dawn.</li>
            </ul>
            <br />

            <strong>USE OF THE VEHICLE</strong>
            <p>3.1 You and any Driver authorised by you must:</p>
            <ul>
                  <li>(a) not use, or allow the Vehicle to be used, for any illegal purpose, race, contest or performance test of any kind;</li>
                  <li>(b) not, without ShaCar’s prior written consent, use, or allow the Vehicle to be used, to push anything;</li>
                  <li>(c) not carry, or allow the Vehicle to carry, more passengers than may be properly accommodated by the seat belt restraints provided in the Vehicle;</li>
                  <li>(d) not be under the influence of alcohol, drugs or have a blood alcohol content that exceeds the legal limit in the State or Territory in which the Vehicle is driven;</li>
                  <li>(e) not, without ShaCar’s prior written consent, use or allow the Vehicle to be used to carry passengers for payment of any kind;</li>
                  <li>(f) not use the Vehicle when it is damaged or unsafe;</li>
                  <li>(g) provided it is reasonable in the circumstances to do so, not drive the Vehicle after an accident or hitting an object (including an animal) until You have obtained ShaCar’s approval to do so;</li>
                  <li>(h) not use the Vehicle to transport goods, except in compliance with all necessary approvals, permits, licences and government requirements (to be obtained at Your cost) and in accordance with the Manufacturer’s Specifications and ShaCar’s recommendations;</li>
                  <li>(i) not smoke within the Vehicle or allow any other person to smoke within the Vehicle at any time;</li>
                  <li>(j) not, without ShaCar’s prior written consent, use the Vehicle to carry any inflammable substance which has a flash point under 22.8°C or any other explosive or corrosive substances;</li>
                  <li>(k) not use the Vehicle for the conveyance or towing of any load unless You have ShaCar’s prior written consent; the load is correctly loaded and secured and not in excess of that for which the Vehicle was manufactured; for towing, the Vehicle is fitted with a tow bar; and the conveyance or towing is undertaken in accordance with the Manufacturer’s Specifications and ShaCar’s recommendations;</li>
                  <li>(l) not use the Vehicle in contravention of any law.</li>
            </ul>
            <p>3.2 You must pay the Roadside Assistance Fees (unless you have purchased Roadside Assistance Cover), and for any professional cleaning or odour extraction required because You or another person has been smoking within the Vehicle and for all parking, speeding and traffic infringements and tolls in respect of the Vehicle during the Hire Period.</p>
            <br />

            <strong>MAINTENANCE, SECURITY AND SAFETY</strong>
            <p>4.1 You and any Driver authorised by you must:</p>
            <ul>
                  <li>(a) maintain all of the Vehicle’s engine oils and engine coolant levels to the Manufacturer’s Specifications, provided that ShaCar has provided the Vehicle to You with engine oils and engine coolant at levels which reflect the Manufacturer’s Specifications;</li>
                  <li>(b) fill the Vehicle with only the fuel type specified in the Manufacturer’s Specifications;</li>
                  <li>(c) keep the Vehicle locked when it is unattended and the keys under Your or the Authorised Driver’s personal control at all times;</li>
                  <li>(d) comply with all applicable seat belt and child restraint laws.</li>
            </ul>
            <p>4.2 ShaCar will provide 24 hour roadside assistance for all inhehire mechanical faults (as reasonably determined by ShaCar or its authorised repairer) at no additional cost provided that the fault does not arise as a result of any unauthorised use of the Vehicle in breach of clauses 1 or 3.1 (save, in respect of clause 3.1(l), for minor infractions).</p>
            <p>4.3 For each roadside assistance callout (for refuelling, a ‘jump start’, a tyre related incident, lost keys, keys locked in vehicle, or a flat battery due to lights or other electrical equipment being left on), You will be charged the Roadside Assistance Fee, unless you have purchased Roadside Assistance Cover.</p>
            <p>4.4 Roadside Assistance Cover does not apply if the Vehicle has been used in breach of clauses 1 or 3.1 or in respect of any additional amount(s) payable under clause 7.5 (save, in respect of clause 3.1(l), for minor infractions).</p>
            <p>4.5 You must not have repairs to the Vehicle carried out unless ShaCar authorises You to do so. ShaCar requires verification of the cost of repairs for reimbursement and GST purposes. You should obtain an original tax invoice/receipt to assist ShaCar. ShaCar will reimburse You for any repairs to the Vehicle authorised by it, provided that the cost of those repairs is verified. To the extent that ShaCar cannot verify the cost of repairs, ShaCar will not reimburse You.</p>
            <br />

            <strong>FUEL</strong>
            <p>5.1 You must fill the Vehicle only with the fuel type specified in the Manufacturer’s Specifications.</p>
            <p>5.2 If you return the Vehicle with less fuel than it had when You hired it, You must pay the Fuel Service amount per litre as set out on the Hire Document. This amount reflects the cost of fuel per litre plus ShaCar’s costs associated with arranging to fill the Vehicle with fuel.</p>
            <p>5.3 For the purpose of 5.2, the fuel level of the Vehicle at the time You hire it and at the time You return it to ShaCar is determined by the onboard hardware in the Vehicle, and the kilometres driven. However, if a Fuel Service amount is charged, that amount will be based on the number of litres of fuel actually put into the Vehicle to return it to the level of fuel that the Vehicle had when You hired it.</p>
            <br />

            <strong>RETURN OF VEHICLE</strong>
            <p>7.1 You must return the Vehicle to ShaCar:</p>
            <ul>
                  <li>(a) to the place, on the date and by the time shown on the Hire Document unless you have informed ShaCar of a change prior to the return date and ShaCar has agreed to the change; and</li>
                  <li>(b) in the same condition as it was at the commencement of the Hire Period, fair wear and tear excepted.</li>
            </ul>
            <p>7.2 If You tell ShaCar that You wish to return the Vehicle to a location other than that stated on the Hire Document, ShaCar will advise You of the amount of the ‘one-way fee’ that You will incur (unless clause 7.5(a) applies to You). If You do not tell ShaCar in advance, You must pay a ‘one-way fee’ of up to $2 per kilometre (depending on the type of Vehicle and the distance travelled) to be determined and paid at the end of the Hire Period. You will also be liable for any Hire Charges calculated under clause 7.4. </p>
            <p>7.3 Despite clauses 7.1 and 7.2, You must return the Vehicle to a ShaCar location during normal operating hours.  </p>
            <p>7.4 If: </p>
            <ul>
                  <li>(a) You return the Vehicle on a date, or at a time, or to a place other than that shown on the Hire Document; </li>
                  <li>(b) You do not comply with any special conditions set out in the ‘Rates’ section on the Hire Document, then the rates shown on the Hire Document will not apply and You must pay the rate that in the circumstances is reasonably applicable for the Vehicle for the Hire Period (which is likely to be higher than the rates shown on the Hire Document) plus the Late Return Charge.</li>
            </ul>
            <p>7.5 ShaCar may request the immediate return of the Vehicle, or ShaCar may recover the
            Vehicle without notice, if:</p>
            <ul>
                  <li>(a) the credit limit on Your method of payment would be exceeded by the debiting of the Hire Charges for a requested extension of the hire of the Vehicle or if a ‘one-way fee’ becomes payable by You;</li>
                  <li>(b) the Hire Period expires without satisfactory arrangements having been made by You with ShaCar; or </li>
                  <li>(c) ShaCar reasonably suspects that:
                        <ul>
                              <li>(1) the Vehicle may be used for an unlawful purpose;</li>
                              <li>(2) damage to the Vehicle, or injury to persons or property, is likely to occur; or</li>
                              <li>(3) the Vehicle will be involved in an industrial dispute.</li>
                        </ul>
                  </li>
            </ul>
            <p>7.6 If You do not return the Vehicle on the date and by the time shown on the Hire Document (or any extended date or time agreed with ShaCar) then:</p>
            <ul>
                  <li>(a) after written notice to You and if the location of the Vehicle is unknown, ShaCar may report the Vehicle as stolen to the Police; </li>
                  <li>(b) You must pay ShaCar all Hire Charges (including additional Hire Charges) and compensate ShaCar in accordance with clause 8 for any loss ShaCar suffers (including all reasonably additional costs ShaCar incurs in recovering the Vehicle) up to the time that the Vehicle is recovered by ShaCar.</li>
            </ul>
            <br />

            <strong>LOSS DAMAGE WAIVER, DAMAGE AND LOSS OF PROPERTY</strong>
            <p>8.1 Subject to this clause 8, You are liable:</p>
            <ul>
                  <li>(a) for the loss of, and all damage to, the Vehicle during the Hire Period; and</li>
                  <li>(b) for all damage to the property of any person:
                        <ul>
                              <li>(i) which is caused or contributed to by You or any person You allow to drive the Vehicle; or</li>
                              <li>(ii) which arises from the use of the Vehicle by You or any person You allow to drive the Vehicle.</li>
                        </ul>
                  </li>
            </ul>
            <p>This clause 8 does not apply to any damage or loss for which ShaCar is liable to You under this Hire Agreement.</p>
            <p>Remember that references to the ‘Vehicle’ include all of its parts, components, Accessories and contents (see the definitions of ‘Vehicle’ and ‘Accessory’ in clause 1). 8.2 Subject to clauses 8.5 and 8.6, ShaCar waives Your liability under clause 8.1 for damage to, or loss of, the Vehicle and will ensure that You and any Driver authorised by you are entitled to be indemnified under the ShaCar Insurance Policy, if:</p>
            <ul>
                  <li>(a) You accept and pay for the Loss Damage Waiver option on the Hire Document (or if it is included in Your rate); and</li>
                  <li>(b) You pay the Excess Amount for each separate event involving:
                        <ul>
                              <li>(i) damage (including hail damage) to, or loss of, the Vehicle; or</li>
                              <li>(ii) damage to the property of any third party which is caused by the use of the Vehicle by You or an Authorised Driver.</li>
                        </ul>
                  </li>
            </ul>
            <p>8.3 In the event of an unintended collision between the Vehicle and any other object, including another vehicle, during the Hire Period that results in damage to the Vehicle or to the property of any third party, ShaCar waives Your liability under clause 8.1 and will ensure that You are entitled to be indemnified under the ShaCar Insurance Policy, and We will refund You any Excess Amount You paid ShaCar, provided that, acting reasonably, ShaCar agrees that You or an Authorised Driver were not at fault and:</p>
            <ul>
                  <li>(a) You and any Driver authorised by you hold a current drivers licence;</li>
                  <li>(b) You have provided ShaCar with any details of the incident that ShaCar reasonably requests including:
                        <ul>
                              <li>(1) the name, residential address, contact phone and licence number of any person involved;</li>
                              <li>(2) the registration numbers of all vehicles involved;</li>
                              <li>(3) an accurate description of the incident and location; and</li>
                              <li>(4) the names of any attending police officers and the stations at which they are based; and</li>
                              <li>(c) You have supplied or ShaCar has established the name of the insurer of any third party You believe was at fault and ShaCar reasonably believes that the insurer will pay ShaCar for the loss or damage.</li>
                        </ul>
                  </li>
            </ul>
            <p>8.4 If clause 8.3 applies, ShaCar may debit Your Account with the Excess Amount at the time of loss of, or damage to, the Vehicle, however when ShaCar reasonably believes that the insurer of a third party will pay ShaCar for the loss or damage, ShaCar will, within a reasonable period of time, refund You the Excess Amount You paid.</p>
            <br />

            <strong>PAYMENT</strong>
            <p>9.1 At the end of the Hire Period, You must pay ShaCar:</p>
            <ul>
                  <li>(a) all Hire Charges;</li>
                  <li>(b) any amount paid or payable by ShaCar or You to any person arising out of Your use of the Vehicle or imposed on You or ShaCar by any government or other competent authority;</li>
                  <li>(c) the replacement cost (as reasonably determined by ShaCar) for a lost or stolen Accessory; and</li>
                  <li>(d) any amount which You reasonably owe to ShaCar under the Hire Agreement, in respect of a breach of the Hire Agreement or otherwise. ShaCar will provide details to You of any amount payable under this clause 9.1.</li>
            </ul>
            <p>9.2 Each Hire Charge calculated and invoiced to You at the time of the return of the Vehicle is subject to subsequent verification by ShaCar. If ShaCar reasonably determines that a Hire Charge should be adjusted, ShaCar will provide details to You if ShaCar has Your contact details.</p>
            <p>9.3 The minimum charge You must pay for the hire of the Vehicle is an amount
            equivalent to:</p>
            <ul>
                  <li>(a) one day’s hire at the ‘daily rate’ shown on the Hire Document (subject to clause 7.4); plus</li>
                  <li>(b) the amount payable for the number of hours hired during the Hire Period.</li>
            </ul>
            <p>9.4 Distance charges are measured from the Vehicle’s odometer.</p>
            <p>9.5 You authorise ShaCar to charge all amounts payable to ShaCar under the Hire Agreement to Your Account.</p>
            <p>9.6 If You pay Your Hire Charges by debit card, You acknowledge that it may take up to 7–10 business days for Your financial institution to release any amount which has been authorised by that institution at the request of ShaCar under clause 9.5 which is in excess of Your Hire Charges.</p>
            <p>9.7 ShaCar will pay, within 14 days, any refund due to You by such method as ShaCar may reasonably choose.</p>
            <p>9.8 If You fail to pay any amount due under or in connection with the Hire Agreement
            within 14 days of the date by which You were required to pay the amount, You must
            also pay ShaCar:</p>
            <ul>
                  <li>(a) interest at 10% per annum (compounded daily) on the amount from the expiry of 14 days from the date on which You were required to pay the amount to the date of payment; and</li>
                  <li>(b) on and as demanded, ShaCar’s Collection Costs including interest on ShaCar’s Collection Costs calculated in accordance with clause 9.8(a) from the date of demand.</li>
            </ul>
            <br />

            <strong>TERMINATION</strong>
            <p>10.1 Either party may terminate the Hire Agreement at any time if the other party commits a material breach of the Hire Agreement. </p>
            <p>10.2 Subject to clauses 7.2 to 7.6 (inclusive) and 9.3, You may terminate the Hire Agreement at any time by returning the Vehicle to ShaCar.</p>
            <br />

            <strong>PROPERTY IN VEHICLE</strong>
            <p>11 Unless ShaCar or a ShaCar employee acting in the course of their employment is negligent, or fraudulent, ShaCar is not liable to any person for any loss of, or damage to any property:</p>
            <ul>
                  <li>(a) left in the Vehicle after its return to ShaCar;</li>
                  <li>(b) stolen from the Vehicle or otherwise lost during the hire.</li>
            </ul>
            <br />

           <strong>PERSONAL PROPERTY SECURITIES LAW</strong>
            <p>12.1 The following terms have their respective meanings in the Personal Property Securities Act 2009 (Cth) (‘PPSA’) – financing statement, interested person, register, proceeds, security agreement and security interest.</p>
            <p>12.2 You acknowledge that:</p>
            <ul>
                  <li>(a) by hiring the Vehicle from ShaCar, You may be granting a security interest in the Vehicle (and any proceeds) to ShaCar, and that this Hire Agreement may constitute a security agreement;</li>
                  <li>(b) any security interest arising under this Hire Agreement attaches to the Vehicle when You obtain possession of the Vehicle and not at any other time;</li>
                  <li>(c) ShaCar may perfect its security interest by lodging a financing statement on the PPSA register.</li>
            </ul>
            <p>12.3 ShaCar does not need to give You any notice under the PPSA (including a notice of a verification statement) unless the notice is required by the PPSA and that requirement cannot be excluded.</p>
            <p>12.4 You must do anything reasonably required by ShaCar to enable ShaCar to register its security interest, with the priority it requires, and to maintain the registration.</p>

      </div>
    
    );
  }
}

export default App;