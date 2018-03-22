//Import react
import React, { Component, PropTypes } from 'react'; 

import style from './Tnc.css'

//Create a component class
export class App extends Component {

  render() {
    // Here goes our page 
    return (
      <div>
      <p><span className={style.title}>Terms and Conditions</span></p>
        <p>&nbsp;</p>
        <p><strong><span>OUR COMMITMENT TO YOU</span></strong></p>
        <p><span>The ShaCar Group is an Australia based business providing a variety of vehicles at numerous locations. We are committed to providing quality service and value for</span></p>
        <p><span>money.</span></p>
        <p>&nbsp;</p>
        <p><span>In particular:</span></p>
        <ul>
          <li><span> we provide only current model vehicles; and</span></li>
          <li><span> our vehicles are serviced and maintained in accordance with manufacturers’</span></li>
        </ul>
        <p><span>recommendations.</span></p>
        <p>&nbsp;</p>
        <p><strong><span>CONSUMER RIGHTS STATEMENT</span></strong></p>
        <p><span>All Your rights set out in this Hire Agreement are in addition to Your rights as a consumer (‘Your Consumer Rights’) under applicable consumer protection legislation, including the Australian Consumer Law.</span></p>
        <p><span>Your Consumer Rights are not excluded, restricted or modified by this Hire Agreement. You can find out more about Your Consumer Rights from consumer organisations and bodies such as the Australian Competition and Consumer Commission and State/Territory fair</span></p>
        <p><span>trading authorities.</span></p>
        <p>&nbsp;</p>
        <p><strong><span>YOUR FEEDBACK</span></strong></p>
        <p><span>We welcome Your feedback. Please tell us where we are going wrong by contacting us</span></p>
        <p><span>through our app under the contact us section. (We would also like to hear about what we are doing right).</span></p>
        <p><br /><br /></p>
        <p><strong><span>INTERPRETING YOUR HIRE AGREEMENT</span></strong></p>
        <p><span>1 The Hire Agreement between ShaCar and You is made on the date shown on the Hire Document You have accepted in respect of the Vehicle, and is made up of that Hire Document and these Terms and Conditions.</span></p>
        <p>&nbsp;</p>
        <p><span>In these Terms and Conditions:</span></p>
        <p><span>‘Accessory’ means any equipment set out in the Hire Document, including (as</span></p>
        <p><span>applicable) any global positioning system receiver or similar device or any child</span></p>
        <p><span>restraint, booster or similar equipment; </span></p>
        <p><span>ShaCar Insurance Policy’ means a policy of liability insurance held by ShaCar for Your and an Authorised Driver’s liability to a third party for damage to the property of that third party which is caused by the legal use of the Vehicle by You or an Authorised Driver;</span></p>
        <p><span>‘Authorised Driver’ means:</span></p>
        <ul>
          <li><span> an additional driver who has been permitted by you to drive the vehicle;</span></li>
          <li><span> Your spouse; or</span></li>
          <li><span> Your employer or a fellow employee, if either is engaged in activities that are</span></li>
        </ul>
        <p><span>incidental to Your business duties;</span></p>
        <p><span>‘ShaCar’ means ShaCar Australia Pty Limited ABN TOBEADDED;</span></p>
        <p><span>‘Collection Costs’ means ShaCar’s reasonable costs of collecting unpaid Hire</span></p>
        <p><span>Charges from You (including ShaCar’s legal costs) and ShaCar’s administration fee of</span></p>
        <p><span>$75 (incl GST) and its debt collection agent’s fee equal to 10% of the unpaid Hire</span></p>
        <p><span>Charges;</span></p>
        <p><span>‘Excess Amount’ means the amount shown as ‘Excess Amount’ on the Hire</span></p>
        <p><span>Document;</span></p>
        <p><span>‘Excess Reduction’ means the product called ‘Excess Reduction’ that You may</span></p>
        <p><span>purchase before the hire commences to reduce any excess amount payable;</span></p>
        <p><span>‘Late Return Charge’ means a charge of $40 (incl GST) payable by You if You do not</span></p>
        <p><span>return the Vehicle on the date and by the time shown on the Hire Document or an</span></p>
        <p><span>alternative return date and time as agreed with ShaCar under clause 7.1(a);</span></p>
        <p><span>‘Loss Damage Waiver’ means the loss damage waiver described on the Hire</span></p>
        <p><span>Document as LDW which reduces Your financial responsibility for loss or damage to</span></p>
        <p><span>the Vehicle to the Excess Amount;</span></p>
        <p><span>‘Manufacturer’s Specifications’ means the specifications of the manufacturer of</span></p>
        <p><span>the Vehicle as set out in the Vehicle’s operations manual located in the glove box of</span></p>
        <p><span>the Vehicle;</span></p>
        <p><span>‘Overhead Damage’ means damage (excluding hail damage) to the Vehicle above</span></p>
        <p><span>the top of the door seal or the top of the front and back windscreens, or damage to</span></p>
        <p><span>third party property, caused by the Vehicle coming into contact with any thing</span></p>
        <p><span>overhanging or obstructing its path, objects being placed on the roof of the Vehicle,</span></p>
        <p><span>or You or any person standing or sitting on the roof of the Vehicle;</span></p>
        <p><span>‘Protection Package’ means the package of products called ‘Protection Package’</span></p>
        <p><span>which includes the Excess Reduction, Personal Accident Insurance and Personal</span></p>
        <p><span>Effects and Baggage Insurance;</span></p>
        <p><span>‘Hire Charges’ means the fees, costs, amounts and charges specified on the</span></p>
        <p><span>Hire Document or payable under this Hire Agreement;</span></p>
        <p><span>‘Hire Period’ means the period commencing on the date shown on the Hire</span></p>
        <p><span>Document (our app) and ending on the date that You return the Vehicle to ShaCar;</span></p>
        <p><span>‘Roadside Assistance Cover’ means, subject to clause 5.4, the provision of the</span></p>
        <p><span>following services for the payment of the Roadside Assistance Cover fee specified in</span></p>
        <p><span>the Hire Document: refuelling up to 6 litres where You run out of fuel, changing flat</span></p>
        <p><span>tyres, provision of spare keys where You lose the keys to the Vehicle, unlocking the</span></p>
        <p><span>Vehicle when You lock the keys in the Vehicle, and provision of a replacement battery</span></p>
        <p><span>or ‘jump start’ where You have a flat battery if You leave the lights, air conditioning,</span></p>
        <p><span>entertainment system(s) or other electrical equipment running while the ignition is off.</span></p>
        <p><span>‘Roadside Assistance Fee’ means a minimum charge of $198 (incl GST), or such</span></p>
        <p><span>other amount as reasonably determined by ShaCar having regard to the roadside</span></p>
        <p><span>assistance callout event (for example: a lost key can cost up to $670 incl GST to</span></p>
        <p><span>replace).</span></p>
        <p><span>‘Substitute Vehicle Insurance’ means a policy of motor vehicle insurance held by</span></p>
        <p><span>You or an Authorised Driver which covers You or the Authorised Driver while using</span></p>
        <p><span>the Vehicle as a substitute for the vehicle insured under that policy;</span></p>
        <p><span>‘Underbody Damage’ means damage to the Vehicle during the Hire Period</span></p>
        <p><span>caused by the Vehicle coming into contact with any thing below the bottom of the</span></p>
        <p><span>door seal and the bottom of the front and rear bumper bars where ShaCar considers,</span></p>
        <p><span>acting reasonably, that the driver of the Vehicle is reasonably at fault for that damage;</span></p>
        <p><span>‘Vehicle’ means the vehicle described on the Hire Document (or any substitute</span></p>
        <p><span>vehicle), and includes its parts, components, keys, remote opening devices, any tag</span></p>
        <p><span>or device for paying electronic tolls, all Accessories and contents supplied by</span></p>
        <p><span>ShaCar; and</span></p>
        <p><span>‘You’ or ‘Your’ refers to the person(s) with whom the Hire Agreement is made;</span></p>
        <p><span>‘Your Account’ means Your debit card, credit card or ShaCar charge account to</span></p>
        <p><span>which Your Hire Charges are to be debited.</span></p>
        <p>&nbsp;</p>
        <p><strong><span>DRIVER</span></strong></p>
        <p><span>1.1 You agree and acknowledge that:</span></p>
        <p><span>(a) only You or a Driver authorised by you will drive the Vehicle; and</span></p>
        <p><span>(b) You and any Driver authorised by you hold a current licence (not being a learner’s</span></p>
        <p><span>licence or provisional licence) to drive the Vehicle and have been licensed to</span></p>
        <p><span>drive vehicles of the same category as the Vehicle for at least 12 consecutive</span></p>
        <p><span>months.</span></p>
        <p><span>1.2 You are responsible for the acts and omissions of an Authorised Driver or any other</span></p>
        <p><span>person You allow to drive the Vehicle and neither You nor any unauthorised driver will</span></p>
        <p><span>have the benefit of the Loss Damage Waiver option or Excess Reduction option (if</span></p>
        <p><span>accepted or included in Your rate) if You allow an unauthorised driver to drive the</span></p>
        <p><span>Vehicle and that unauthorised driver causes loss of or damage to the Vehicle or</span></p>
        <p><span>damage to the property of a third person.</span></p>
        <p>&nbsp;</p>
        <p><strong><span>WHERE YOU CAN AND CANNOT DRIVE THE VEHICLE</span></strong></p>
        <p><span>2.1 You and any Driver authorised by you must only use the Vehicle:</span></p>
        <p><span>(a) on a road which is properly formed and constructed as a sealed, metalled or</span></p>
        <p><span>gravel road (unless the Vehicle is a 4 wheel drive Vehicle and in Western</span></p>
        <p><span>Australia where it may only be used on graded, unsealed roads unless</span></p>
        <p><span>approved in writing);</span></p>
        <p><span>(b) In Western Australia You and any Driver authorised by you must not use the vehicle off road (e.g. on a fire trail, beach, track, grassed area or to cross streams or any</span></p>
        <p><span>other body of water) unless you have authorisation from ShaCar in writing.</span></p>
        <p><span>2.2 You and any Driver authorised by you must not, unless authorised in writing by ShaCar, drive or take the Vehicle:</span></p>
        <p><span>(a) to Gove Peninsula or any island off the coast of Australia (including, but not</span></p>
        <p><span>limited to, Bruny Island, Fraser Island, Groote Eylandt, or the Tiwi Islands):</span></p>
        <p><span>(b) to Kangaroo Island; however, if so authorised, You and any Driver authorised by you must not drive the Vehicle between dusk and dawn outside the town limits;</span></p>
        <p><span>(c) into or out of the Northern Territory, Western Australia or Tasmania;</span></p>
        <p><span>(d) in Queensland:</span></p>
        <p><span>(1) on Highway No. 27: beyond Chillagoe in a Westerly direction;</span></p>
        <p><span>(2) on Highway No. 1: beyond Normanton in a Southerly direction and no</span></p>
        <p><span>further North than Karumba;</span></p>
        <p><span>(3) if the Vehicle is a passenger vehicle or truck, beyond Cooktown to the</span></p>
        <p><span>North or Lakeland to the West and no further North than Cape Tribulation</span></p>
        <p><span>on the Coast Road; or</span></p>
        <p><span>(4) on the Coast Road from Helenvale to Cape Tribulation, or from Laura to</span></p>
        <p><span>Lakeland, unless the Vehicle is a 4 wheel drive vehicle;</span></p>
        <p><span>(e) in the snow (at any time and anywhere (including Tasmania));</span></p>
        <p><span>(f) above the snow line in:</span></p>
        <p><span>(1) New South Wales (being Jindabyne); or</span></p>
        <p><span>(2) Victoria (being Bright), from the beginning of June until the end of September;</span></p>
        <p><span>(g) on beaches or through streams, dams, rivers or flood waters;</span></p>
        <p><span>(h) in Western Australia:</span></p>
        <p><span>(1) to any parts North of Carnarvon;</span></p>
        <p><span>(2) on the Gibb River Road, Cape Leveque Road, Widdjana Gorge, Canning</span></p>
        <p><span>Stock Route, Gunbarrel Highway and Holland Track;</span></p>
        <p><span>(3) beyond 100 kilometres of the Perth city limits between dusk and dawn; or</span></p>
        <p><span>(4) otherwise, outside any town or city limits between dusk and dawn; or</span></p>
        <p><span>(i) in the Northern Territory:</span></p>
        <p><span>(1) on the Jim Jim Falls Road to Jim Jim Falls and Twin Falls; or</span></p>
        <p><span>(2) outside any town or city limits between dusk and dawn.</span></p>
        <p>&nbsp;</p>
        <p><strong><span>USE OF THE VEHICLE</span></strong></p>
        <p><span>3.1 You and any Driver authorised by you must:</span></p>
        <p><span>(a) not use, or allow the Vehicle to be used, for any illegal purpose, race, contest or</span></p>
        <p><span>performance test of any kind;</span></p>
        <p><span>(b) not, without ShaCar’s prior written consent, use, or allow the Vehicle to be used,</span></p>
        <p><span>to push anything;</span></p>
        <p><span>(c) not carry, or allow the Vehicle to carry, more passengers than may be properly</span></p>
        <p><span>accommodated by the seat belt restraints provided in the Vehicle;</span></p>
        <p><span>(d) not be under the influence of alcohol, drugs or have a blood alcohol content that</span></p>
        <p><span>exceeds the legal limit in the State or Territory in which the Vehicle is driven;</span></p>
        <p><span>(e) not, without ShaCar’s prior written consent, use or allow the Vehicle to be used</span></p>
        <p><span>to carry passengers for payment of any kind;</span></p>
        <p><span>(f) not use the Vehicle when it is damaged or unsafe;</span></p>
        <p><span>(g) provided it is reasonable in the circumstances to do so, not drive the Vehicle after</span></p>
        <p><span>an accident or hitting an object (including an animal) until You have obtained</span></p>
        <p><span>ShaCar’s approval to do so;</span></p>
        <p><span>(h) not use the Vehicle to transport goods, except in compliance with all necessary</span></p>
        <p><span>approvals, permits, licences and government requirements (to be obtained at</span></p>
        <p><span>Your cost) and in accordance with the Manufacturer’s Specifications and ShaCar’s</span></p>
        <p><span>recommendations;</span></p>
        <p><span>(i) not smoke within the Vehicle or allow any other person to smoke within the</span></p>
        <p><span>Vehicle at any time;</span></p>
        <p><span>(j) not, without ShaCar’s prior written consent, use the Vehicle to carry any</span></p>
        <p><span>inflammable substance which has a flash point under 22.8°C or any other</span></p>
        <p><span>explosive or corrosive substances;</span></p>
        <p><span>(k) not use the Vehicle for the conveyance or towing of any load unless You have</span></p>
        <p><span>ShaCar’s prior written consent; the load is correctly loaded and secured and not</span></p>
        <p><span>in excess of that for which the Vehicle was manufactured; for towing, the Vehicle</span></p>
        <p><span>is fitted with a tow bar; and the conveyance or towing is undertaken in accordance</span></p>
        <p><span>with the Manufacturer’s Specifications and ShaCar’s recommendations; and</span></p>
        <p><span>(l) not use the Vehicle in contravention of any law.</span></p>
        <p><span>3.2 You must pay the Roadside Assistance Fees (unless you have purchased Roadside</span></p>
        <p><span>Assistance Cover), and for any professional cleaning or odour extraction required</span></p>
        <p><span>because You or another person has been smoking within the Vehicle and for all</span></p>
        <p><span>parking, speeding and traffic infringements and tolls in respect of the Vehicle during</span></p>
        <p><span>the Hire Period.</span></p>
        <p>&nbsp;</p>
        <p><strong><span>MAINTENANCE, SECURITY AND SAFETY</span></strong></p>
        <p><span>4.1 You and any Driver authorised by you must:</span></p>
        <p><span>(a) maintain all of the Vehicle’s engine oils and engine coolant levels to the</span></p>
        <p><span>Manufacturer’s Specifications, provided that ShaCar has provided the Vehicle to</span></p>
        <p><span>You with engine oils and engine coolant at levels which reflect the Manufacturer’s</span></p>
        <p><span>Specifications;</span></p>
        <p><span>(b) fill the Vehicle with only the fuel type specified in the Manufacturer’s Specifications;</span></p>
        <p><span>(c) keep the Vehicle locked when it is unattended and the keys under Your or the</span></p>
        <p><span>Authorised Driver’s personal control at all times; and</span></p>
        <p><span>(d) comply with all applicable seat belt and child restraint laws.</span></p>
        <p><span>4.2 ShaCar will provide 24 hour roadside assistance for all inhehire mechanical faults (as reasonably determined by ShaCar or its authorised repairer) at no additional cost</span></p>
        <p><span>provided that the fault does not arise as a result of any unauthorised use of the Vehicle</span></p>
        <p><span>in breach of clauses 1 or 3.1 (save, in respect of clause 3.1(l), for minor infractions).</span></p>
        <p><span>4.3 For each roadside assistance callout (for refuelling, a ‘jump start’, a tyre related incident,</span></p>
        <p><span>lost keys, keys locked in vehicle, or a flat battery due to lights or other electrical</span></p>
        <p><span>equipment being left on), You will be charged the Roadside Assistance Fee, unless you</span></p>
        <p><span>have purchased Roadside Assistance Cover.</span></p>
        <p><span>4.4 Roadside Assistance Cover does not apply if the Vehicle has been used in breach of clauses 1 or 3.1 or in respect of any additional amount(s) payable under clause 7.5</span></p>
        <p><span>(save, in respect of clause 3.1(l), for minor infractions).</span></p>
        <p><span>4.5 You must not have repairs to the Vehicle carried out unless ShaCar authorises You to</span></p>
        <p><span>do so. ShaCar requires verification of the cost of repairs for reimbursement and GST</span></p>
        <p><span>purposes. You should obtain an original tax invoice/receipt to assist ShaCar. ShaCar</span></p>
        <p><span>will reimburse You for any repairs to the Vehicle authorised by it, provided that the cost</span></p>
        <p><span>of those repairs is verified. To the extent that ShaCar cannot verify the cost of repairs,</span></p>
        <p><span>ShaCar will not reimburse You.</span></p>
        <p>&nbsp;</p>
        <p><strong><span>FUEL</span></strong></p>
        <p><span>5.1 You must fill the Vehicle only with the fuel type specified in the Manufacturer’s Specifications.</span></p>
        <p><span>5.2 If you return the Vehicle with less fuel than it had when You hired it, You must pay the Fuel Service amount per litre as set out on the Hire Document. This amount reflects the cost of fuel per litre plus ShaCar’s costs associated with arranging to fill the Vehicle with fuel.</span></p>
        <p><span>5.3 For the purpose of 5.2, the fuel level of the Vehicle at the time You hire it and at the time You return it to ShaCar is determined by the onboard hardware in the Vehicle, and the kilometres driven. However, if a Fuel Service amount is charged, that amount will be based on the number of litres of fuel actually put into the Vehicle to return it to the level of fuel that the Vehicle had when You hired it.</span></p>
        <p>&nbsp;</p>
        <p><strong><span>RETURN OF VEHICLE</span></strong></p>
        <p><span>7.1 You must return the Vehicle to ShaCar:</span></p>
        <p><span>(a) to the place, on the date and by the time shown on the Hire Document unless</span></p>
        <p><span>you have informed ShaCar of a change prior to the return date and ShaCar has</span></p>
        <p><span>agreed to the change; and</span></p>
        <p><span>(b) in the same condition as it was at the commencement of the Hire Period, fair</span></p>
        <p><span>wear and tear excepted.</span></p>
        <p><span>7.2 If You tell ShaCar that You wish to return the Vehicle to a location other than that stated on the Hire Document, ShaCar will advise You of the amount of the ‘one-way fee’ that You will incur (unless clause 7.5(a) applies to You). If You do not tell ShaCar in advance, You must pay a ‘one-way fee’ of up to $2 per kilometre (depending on the type of Vehicle and the distance travelled) to be determined and paid at the end of the Hire Period. You will also be liable for any Hire Charges calculated under clause 7.4.</span></p>
        <p><span>7.3 Despite clauses 7.1 and 7.2, You must return the Vehicle to a ShaCar location during normal operating hours.</span></p>
        <p><span>7.4 If:</span></p>
        <p><span>(a) You return the Vehicle on a date, or at a time, or to a place other than that shown</span></p>
        <p><span>on the Hire Document; or</span></p>
        <p><span>(b) You do not comply with any special conditions set out in the ‘Rates’ section on the</span></p>
        <p><span>Hire Document,</span></p>
        <p><span>then the rates shown on the Hire Document will not apply and You must pay the rate</span></p>
        <p><span>that in the circumstances is reasonably applicable for the Vehicle for the Hire Period</span></p>
        <p><span>(which is likely to be higher than the rates shown on the Hire Document) plus the Late</span></p>
        <p><span>Return Charge.</span></p>
        <p><span>7.5 ShaCar may request the immediate return of the Vehicle, or ShaCar may recover the</span></p>
        <p><span>Vehicle without notice, if:</span></p>
        <p><span>(a) the credit limit on Your method of payment would be exceeded by the debiting</span></p>
        <p><span>of the Hire Charges for a requested extension of the hire of the Vehicle or if</span></p>
        <p><span>a ‘one-way fee’ becomes payable by You;</span></p>
        <p><span>(b) the Hire Period expires without satisfactory arrangements having been made</span></p>
        <p><span>by You with ShaCar; or</span></p>
        <p><span>(c) ShaCar reasonably suspects that:</span></p>
        <p><span>(1) the Vehicle may be used for an unlawful purpose;</span></p>
        <p><span>(2) damage to the Vehicle, or injury to persons or property, is likely to occur; or</span></p>
        <p><span>(3) the Vehicle will be involved in an industrial dispute.</span></p>
        <p><span>7.6 If You do not return the Vehicle on the date and by the time shown on the Hire</span></p>
        <p><span>Document (or any extended date or time agreed with ShaCar) then:</span></p>
        <p><span>(a) after written notice to You and if the location of the Vehicle is unknown, ShaCar</span></p>
        <p><span>may report the Vehicle as stolen to the Police; and</span></p>
        <p><span>(b) You must pay ShaCar all Hire Charges (including additional Hire Charges)</span></p>
        <p><span>and compensate ShaCar in accordance with clause 8 for any loss ShaCar suffers</span></p>
        <p><span>(including all reasonably additional costs ShaCar incurs in recovering the Vehicle)</span></p>
        <p><span>up to the time that the Vehicle is recovered by ShaCar.</span></p>
        <p>&nbsp;</p>
        <p><strong><span>LOSS DAMAGE WAIVER, DAMAGE AND LOSS OF PROPERTY</span></strong></p>
        <p><span>8.1 Subject to this clause 8, You are liable:</span></p>
        <p><span>(a) for the loss of, and all damage to, the Vehicle during the Hire Period; and</span></p>
        <p><span>(b) for all damage to the property of any person:</span></p>
        <p><span>(i) which is caused or contributed to by You or any person You allow to drive</span></p>
        <p><span>the Vehicle; or</span></p>
        <p><span>(ii) which arises from the use of the Vehicle by You or any person You allow to</span></p>
        <p><span>drive the Vehicle.</span></p>
        <p><span>This clause 8 does not apply to any damage or loss for which ShaCar is liable to You</span></p>
        <p><span>under this Hire Agreement.</span></p>
        <p><span>Remember that references to the ‘Vehicle’ include all of its parts, components, Accessories and contents (see the definitions of ‘Vehicle’ and ‘Accessory’ in clause 1).</span></p>
        <p><span>8.2 Subject to clauses 8.5 and 8.6, ShaCar waives Your liability under clause 8.1 for</span></p>
        <p><span>damage to, or loss of, the Vehicle and will ensure that You and any Driver authorised by you</span></p>
        <p><span>are entitled to be indemnified under the ShaCar Insurance Policy, if:</span></p>
        <p><span>(a) You accept and pay for the Loss Damage Waiver option on the Hire Document</span></p>
        <p><span>(or if it is included in Your rate); and</span></p>
        <p><span>(b) You pay the Excess Amount for each separate event involving:</span></p>
        <p><span>(i) damage (including hail damage) to, or loss of, the Vehicle; or</span></p>
        <p><span>(ii) damage to the property of any third party which is caused by the use of the</span></p>
        <p><span>Vehicle by You or an Authorised Driver.</span></p>
        <p><span>8.3 In the event of an unintended collision between the Vehicle and any other object,</span></p>
        <p><span>including another vehicle, during the Hire Period that results in damage to the</span></p>
        <p><span>Vehicle or to the property of any third party, ShaCar waives Your liability under clause</span></p>
        <p><span>8.1 and will ensure that You are entitled to be indemnified under the ShaCar Insurance</span></p>
        <p><span>Policy, and We will refund You any Excess Amount You paid ShaCar, provided that,</span></p>
        <p><span>acting reasonably, ShaCar agrees that You or an Authorised Driver were not at fault</span></p>
        <p><span>and:</span></p>
        <p><span>(a) You and any Driver authorised by you hold a current drivers licence;</span></p>
        <p><span>(b) You have provided ShaCar with any details of the incident that ShaCar</span></p>
        <p><span>reasonably requests including:</span></p>
        <p><span>(1) the name, residential address, contact phone and licence number of any</span></p>
        <p><span>person involved;</span></p>
        <p><span>(2) the registration numbers of all vehicles involved;</span></p>
        <p><span>(3) an accurate description of the incident and location; and</span></p>
        <p><span>(4) the names of any attending police officers and the stations at which they</span></p>
        <p><span>are based; and</span></p>
        <p><span>(c) You have supplied or ShaCar has established the name of the insurer of any third</span></p>
        <p><span>party You believe was at fault and ShaCar reasonably believes that the insurer will</span></p>
        <p><span>pay ShaCar for the loss or damage.</span></p>
        <p><span>8.4 If clause 8.3 applies, ShaCar may debit Your Account with the Excess Amount at the time of loss of, or damage to, the Vehicle, however when ShaCar reasonably believes that the insurer of a third party will pay ShaCar for the loss or damage, ShaCar will, within a reasonable period of time, refund You the Excess Amount You paid.</span></p>
        <p>&nbsp;</p>
        <p><span>PAYMENT</span></p>
        <p><span>9.1 At the end of the Hire Period, You must pay ShaCar:</span></p>
        <p><span>(a) all Hire Charges;</span></p>
        <p><span>(b) any amount paid or payable by ShaCar or You to any person arising out of Your</span></p>
        <p><span>use of the Vehicle or imposed on You or ShaCar by any government or other</span></p>
        <p><span>competent authority;</span></p>
        <p><span>(c) the replacement cost (as reasonably determined by ShaCar) for a lost or stolen</span></p>
        <p><span>Accessory; and</span></p>
        <p><span>(d) any amount which You reasonably owe to ShaCar under the Hire Agreement,</span></p>
        <p><span>in respect of a breach of the Hire Agreement or otherwise. ShaCar will provide</span></p>
        <p><span>details to You of any amount payable under this clause 9.1.</span></p>
        <p><span>9.2 Each Hire Charge calculated and invoiced to You at the time of the return of the</span></p>
        <p><span>Vehicle is subject to subsequent verification by ShaCar. If ShaCar reasonably</span></p>
        <p><span>determines that a Hire Charge should be adjusted, ShaCar will provide details to</span></p>
        <p><span>You if ShaCar has Your contact details.</span></p>
        <p><span>9.3 The minimum charge You must pay for the hire of the Vehicle is an amount</span></p>
        <p><span>equivalent to:</span></p>
        <p><span>(a) one day’s hire at the ‘daily rate’ shown on the Hire Document (subject to</span></p>
        <p><span>clause 7.4); plus</span></p>
        <p><span>(b) the amount payable for the number of hours hired during the Hire Period.</span></p>
        <p><span>9.4 Distance charges are measured from the Vehicle’s odometer.</span></p>
        <p><span>9.5 You authorise ShaCar to charge all amounts payable to ShaCar under the Hire</span></p>
        <p><span>Agreement to Your Account.</span></p>
        <p><span>9.6 If You pay Your Hire Charges by debit card, You acknowledge that it may take up to</span></p>
        <p><span>7–10 business days for Your financial institution to release any amount which has been</span></p>
        <p><span>authorised by that institution at the request of ShaCar under clause 9.5 which is in</span></p>
        <p><span>excess of Your Hire Charges.</span></p>
        <p><span>9.7 ShaCar will pay, within 14 days, any refund due to You by such method as ShaCar may</span></p>
        <p><span>reasonably choose.</span></p>
        <p><span>9.8 If You fail to pay any amount due under or in connection with the Hire Agreement</span></p>
        <p><span>within 14 days of the date by which You were required to pay the amount, You must</span></p>
        <p><span>also pay ShaCar:</span></p>
        <p><span>(a) interest at 10% per annum (compounded daily) on the amount from the expiry</span></p>
        <p><span>of 14 days from the date on which You were required to pay the amount to the</span></p>
        <p><span>date of payment; and</span></p>
        <p><span>(b) on and as demanded, ShaCar’s Collection Costs including interest on ShaCar’s</span></p>
        <p><span>Collection Costs calculated in accordance with clause 9.8(a) from the date of</span></p>
        <p><span>demand.</span></p>
        <p>&nbsp;</p>
        <p><span>TERMINATION</span></p>
        <p><span>10.1 Either party may terminate the Hire Agreement at any time if the other party</span></p>
        <p><span>commits a material breach of the Hire Agreement.</span></p>
        <p><span>10.2 Subject to clauses 7.2 to 7.6 (inclusive) and 9.3, You may terminate the Hire</span></p>
        <p><span>Agreement at any time by returning the Vehicle to ShaCar.</span></p>
        <p><br /><br /></p>
        <p><span>PROPERTY IN VEHICLE</span></p>
        <p><span>11 Unless ShaCar or a ShaCar employee acting in the course of their employment is</span></p>
        <p><span>negligent, or fraudulent, ShaCar is not liable to any person for any loss of, or damage</span></p>
        <p><span>to any property:</span></p>
        <p><span>(a) left in the Vehicle after its return to ShaCar; or</span></p>
        <p><span>(b) stolen from the Vehicle or otherwise lost during the hire.</span></p>
        <p>&nbsp;</p>
        <p><span>PERSONAL PROPERTY SECURITIES LAW</span></p>
        <p><span>12.1 The following terms have their respective meanings in the Personal Property Securities</span></p>
        <p><span>Act 2009 (Cth) (‘PPSA’) – financing statement, interested person, register,</span></p>
        <p><span>proceeds, security agreement and security interest.</span></p>
        <p><span>12.2 You acknowledge that:</span></p>
        <p><span>(a) by hiring the Vehicle from ShaCar, You may be granting a security interest in</span></p>
        <p><span>the Vehicle (and any proceeds) to ShaCar, and that this Hire Agreement may</span></p>
        <p><span>constitute a security agreement;</span></p>
        <p><span>(b) any security interest arising under this Hire Agreement attaches to the Vehicle</span></p>
        <p><span>when You obtain possession of the Vehicle and not at any other time; and</span></p>
        <p><span>(c) ShaCar may perfect its security interest by lodging a financing statement on the</span></p>
        <p><span>PPSA register.</span></p>
        <p><span>12.3 ShaCar does not need to give You any notice under the PPSA (including a notice of a</span></p>
        <p><span>verification statement) unless the notice is required by the PPSA and that requirement</span></p>
        <p><span>cannot be excluded.</span></p>
        <p><span>12.4 You must do anything reasonably required by ShaCar to enable ShaCar to register its</span></p>
        <p><span>security interest, with the priority it requires, and to maintain the registration.</span></p>
    </div>
    
    );
  }
}

export default App;