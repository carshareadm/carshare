//Import react
import React, { Component, PropTypes } from 'react'; 

//Create a component class
export class App extends Component {

  render() {
    // Here goes our page 
    return (
      <div class="c7">
      <style type="text/css" dangerouslySetInnerHTML={{__html: ".lst-kix_list_4-1>li{counter-increment:lst-ctn-kix_list_4-1}ol.lst-kix_list_3-1{list-style-type:none}ol.lst-kix_list_3-2{list-style-type:none}.lst-kix_list_3-1>li{counter-increment:lst-ctn-kix_list_3-1}ol.lst-kix_list_3-3{list-style-type:none}ol.lst-kix_list_3-4.start{counter-reset:lst-ctn-kix_list_3-4 0}ol.lst-kix_list_3-4{list-style-type:none}.lst-kix_list_2-1>li{counter-increment:lst-ctn-kix_list_2-1}ul.lst-kix_list_1-0{list-style-type:none}ol.lst-kix_list_3-0{list-style-type:none}ol.lst-kix_list_2-6.start{counter-reset:lst-ctn-kix_list_2-6 0}.lst-kix_list_3-0>li:before{content:\"\" counter(lst-ctn-kix_list_3-0,decimal) \". \"}ol.lst-kix_list_3-1.start{counter-reset:lst-ctn-kix_list_3-1 0}.lst-kix_list_3-1>li:before{content:\"\" counter(lst-ctn-kix_list_3-1,lower-latin) \". \"}.lst-kix_list_3-2>li:before{content:\"\" counter(lst-ctn-kix_list_3-2,lower-roman) \". \"}.lst-kix_list_4-0>li{counter-increment:lst-ctn-kix_list_4-0}ol.lst-kix_list_2-3.start{counter-reset:lst-ctn-kix_list_2-3 0}ul.lst-kix_list_1-3{list-style-type:none}.lst-kix_list_3-5>li:before{content:\"\" counter(lst-ctn-kix_list_3-5,lower-roman) \". \"}ul.lst-kix_list_1-4{list-style-type:none}ul.lst-kix_list_1-1{list-style-type:none}.lst-kix_list_3-4>li:before{content:\"\" counter(lst-ctn-kix_list_3-4,lower-latin) \". \"}ul.lst-kix_list_1-2{list-style-type:none}ul.lst-kix_list_1-7{list-style-type:none}.lst-kix_list_3-3>li:before{content:\"\" counter(lst-ctn-kix_list_3-3,decimal) \". \"}ol.lst-kix_list_3-5{list-style-type:none}ul.lst-kix_list_1-8{list-style-type:none}ol.lst-kix_list_3-6{list-style-type:none}ul.lst-kix_list_1-5{list-style-type:none}ol.lst-kix_list_3-7{list-style-type:none}ul.lst-kix_list_1-6{list-style-type:none}ol.lst-kix_list_3-8{list-style-type:none}.lst-kix_list_3-8>li:before{content:\"\" counter(lst-ctn-kix_list_3-8,lower-roman) \". \"}.lst-kix_list_2-0>li{counter-increment:lst-ctn-kix_list_2-0}.lst-kix_list_2-3>li{counter-increment:lst-ctn-kix_list_2-3}.lst-kix_list_3-6>li:before{content:\"\" counter(lst-ctn-kix_list_3-6,decimal) \". \"}.lst-kix_list_4-3>li{counter-increment:lst-ctn-kix_list_4-3}.lst-kix_list_3-7>li:before{content:\"\" counter(lst-ctn-kix_list_3-7,lower-latin) \". \"}ol.lst-kix_list_4-5.start{counter-reset:lst-ctn-kix_list_4-5 0}ol.lst-kix_list_3-7.start{counter-reset:lst-ctn-kix_list_3-7 0}ol.lst-kix_list_4-2.start{counter-reset:lst-ctn-kix_list_4-2 0}.lst-kix_list_3-2>li{counter-increment:lst-ctn-kix_list_3-2}ol.lst-kix_list_2-2{list-style-type:none}ol.lst-kix_list_2-3{list-style-type:none}ol.lst-kix_list_2-4{list-style-type:none}ol.lst-kix_list_2-5{list-style-type:none}.lst-kix_list_4-4>li{counter-increment:lst-ctn-kix_list_4-4}ol.lst-kix_list_2-0{list-style-type:none}ol.lst-kix_list_2-1{list-style-type:none}.lst-kix_list_4-8>li:before{content:\"\" counter(lst-ctn-kix_list_4-8,lower-roman) \". \"}.lst-kix_list_4-7>li:before{content:\"\" counter(lst-ctn-kix_list_4-7,lower-latin) \". \"}ol.lst-kix_list_4-1.start{counter-reset:lst-ctn-kix_list_4-1 0}ol.lst-kix_list_4-8.start{counter-reset:lst-ctn-kix_list_4-8 0}ol.lst-kix_list_3-3.start{counter-reset:lst-ctn-kix_list_3-3 0}ol.lst-kix_list_2-6{list-style-type:none}ol.lst-kix_list_2-7{list-style-type:none}ol.lst-kix_list_2-8{list-style-type:none}.lst-kix_list_3-0>li{counter-increment:lst-ctn-kix_list_3-0}.lst-kix_list_3-3>li{counter-increment:lst-ctn-kix_list_3-3}ol.lst-kix_list_4-0.start{counter-reset:lst-ctn-kix_list_4-0 0}.lst-kix_list_3-6>li{counter-increment:lst-ctn-kix_list_3-6}.lst-kix_list_2-5>li{counter-increment:lst-ctn-kix_list_2-5}.lst-kix_list_2-8>li{counter-increment:lst-ctn-kix_list_2-8}ol.lst-kix_list_3-2.start{counter-reset:lst-ctn-kix_list_3-2 0}.lst-kix_list_2-2>li{counter-increment:lst-ctn-kix_list_2-2}ol.lst-kix_list_2-4.start{counter-reset:lst-ctn-kix_list_2-4 0}ol.lst-kix_list_4-7.start{counter-reset:lst-ctn-kix_list_4-7 0}.lst-kix_list_2-6>li:before{content:\"\" counter(lst-ctn-kix_list_2-6,decimal) \". \"}.lst-kix_list_2-7>li:before{content:\"\" counter(lst-ctn-kix_list_2-7,lower-latin) \". \"}.lst-kix_list_2-7>li{counter-increment:lst-ctn-kix_list_2-7}.lst-kix_list_3-7>li{counter-increment:lst-ctn-kix_list_3-7}.lst-kix_list_2-4>li:before{content:\"\" counter(lst-ctn-kix_list_2-4,lower-latin) \". \"}.lst-kix_list_2-5>li:before{content:\"\" counter(lst-ctn-kix_list_2-5,lower-roman) \". \"}.lst-kix_list_2-8>li:before{content:\"\" counter(lst-ctn-kix_list_2-8,lower-roman) \". \"}ol.lst-kix_list_4-6.start{counter-reset:lst-ctn-kix_list_4-6 0}ol.lst-kix_list_3-0.start{counter-reset:lst-ctn-kix_list_3-0 0}ol.lst-kix_list_4-3.start{counter-reset:lst-ctn-kix_list_4-3 0}.lst-kix_list_4-7>li{counter-increment:lst-ctn-kix_list_4-7}ol.lst-kix_list_3-8.start{counter-reset:lst-ctn-kix_list_3-8 0}ol.lst-kix_list_2-5.start{counter-reset:lst-ctn-kix_list_2-5 0}.lst-kix_list_4-0>li:before{content:\"\" counter(lst-ctn-kix_list_4-0,decimal) \". \"}.lst-kix_list_2-6>li{counter-increment:lst-ctn-kix_list_2-6}.lst-kix_list_3-8>li{counter-increment:lst-ctn-kix_list_3-8}.lst-kix_list_4-1>li:before{content:\"\" counter(lst-ctn-kix_list_4-1,lower-latin) \". \"}.lst-kix_list_4-6>li{counter-increment:lst-ctn-kix_list_4-6}.lst-kix_list_4-4>li:before{content:\"\" counter(lst-ctn-kix_list_4-4,lower-latin) \". \"}ol.lst-kix_list_2-2.start{counter-reset:lst-ctn-kix_list_2-2 0}.lst-kix_list_4-3>li:before{content:\"\" counter(lst-ctn-kix_list_4-3,decimal) \". \"}.lst-kix_list_4-5>li:before{content:\"\" counter(lst-ctn-kix_list_4-5,lower-roman) \". \"}.lst-kix_list_4-2>li:before{content:\"\" counter(lst-ctn-kix_list_4-2,lower-roman) \". \"}.lst-kix_list_4-6>li:before{content:\"\" counter(lst-ctn-kix_list_4-6,decimal) \". \"}.lst-kix_list_3-5>li{counter-increment:lst-ctn-kix_list_3-5}ol.lst-kix_list_4-0{list-style-type:none}.lst-kix_list_3-4>li{counter-increment:lst-ctn-kix_list_3-4}ol.lst-kix_list_4-1{list-style-type:none}ol.lst-kix_list_4-4.start{counter-reset:lst-ctn-kix_list_4-4 0}ol.lst-kix_list_4-2{list-style-type:none}ol.lst-kix_list_4-3{list-style-type:none}.lst-kix_list_2-4>li{counter-increment:lst-ctn-kix_list_2-4}ol.lst-kix_list_3-6.start{counter-reset:lst-ctn-kix_list_3-6 0}ol.lst-kix_list_2-8.start{counter-reset:lst-ctn-kix_list_2-8 0}ol.lst-kix_list_4-8{list-style-type:none}.lst-kix_list_1-0>li:before{content:\"\\0025cf  \"}ol.lst-kix_list_4-4{list-style-type:none}ol.lst-kix_list_4-5{list-style-type:none}.lst-kix_list_1-1>li:before{content:\"\\0025cb  \"}.lst-kix_list_1-2>li:before{content:\"\\0025a0  \"}ol.lst-kix_list_2-0.start{counter-reset:lst-ctn-kix_list_2-0 0}ol.lst-kix_list_4-6{list-style-type:none}ol.lst-kix_list_4-7{list-style-type:none}.lst-kix_list_1-3>li:before{content:\"\\0025cf  \"}.lst-kix_list_1-4>li:before{content:\"\\0025cb  \"}ol.lst-kix_list_3-5.start{counter-reset:lst-ctn-kix_list_3-5 0}.lst-kix_list_4-8>li{counter-increment:lst-ctn-kix_list_4-8}.lst-kix_list_1-7>li:before{content:\"\\0025cb  \"}ol.lst-kix_list_2-7.start{counter-reset:lst-ctn-kix_list_2-7 0}.lst-kix_list_1-5>li:before{content:\"\\0025a0  \"}.lst-kix_list_1-6>li:before{content:\"\\0025cf  \"}.lst-kix_list_2-0>li:before{content:\"\" counter(lst-ctn-kix_list_2-0,decimal) \". \"}.lst-kix_list_2-1>li:before{content:\"\" counter(lst-ctn-kix_list_2-1,lower-latin) \". \"}ol.lst-kix_list_2-1.start{counter-reset:lst-ctn-kix_list_2-1 0}.lst-kix_list_4-5>li{counter-increment:lst-ctn-kix_list_4-5}.lst-kix_list_1-8>li:before{content:\"\\0025a0  \"}.lst-kix_list_2-2>li:before{content:\"\" counter(lst-ctn-kix_list_2-2,lower-roman) \". \"}.lst-kix_list_2-3>li:before{content:\"\" counter(lst-ctn-kix_list_2-3,decimal) \". \"}.lst-kix_list_4-2>li{counter-increment:lst-ctn-kix_list_4-2}ol{margin:0;padding:0}table td,table th{padding:0}.c5{color:#000000;font-weight:700;text-decoration:none;vertical-align:baseline;font-size:11pt;font-family:\"Lato\";font-style:normal}.c4{color:#000000;font-weight:700;text-decoration:none;vertical-align:baseline;font-size:26pt;font-family:\"Lato\";font-style:normal}.c0{color:#000000;font-weight:400;text-decoration:none;vertical-align:baseline;font-size:11pt;font-family:\"Lato\";font-style:normal}.c1{padding-top:0pt;padding-bottom:0pt;line-height:1.1500000000000001;orphans:2;widows:2;text-align:left}.c9{padding-top:24pt;padding-bottom:3pt;line-height:1.15;page-break-after:avoid;text-align:left}.c7{background-color:#ffffff;max-width:425.3pt;padding:28.3pt 85pt 28.3pt 85pt}.c6{font-weight:700}.c8{margin-right:0.1pt}.c3{height:11pt}.c2{font-size:9pt}.title{padding-top:0pt;color:#000000;font-size:26pt;padding-bottom:3pt;font-family:\"Lato\";line-height:1.1500000000000001;page-break-after:avoid;orphans:2;widows:2;text-align:left}.subtitle{padding-top:0pt;color:#666666;font-size:15pt;padding-bottom:16pt;font-family:\"Lato\";line-height:1.1500000000000001;page-break-after:avoid;orphans:2;widows:2;text-align:left}li{color:#000000;font-size:11pt;font-family:\"Lato\"}p{margin:0;color:#000000;font-size:11pt;font-family:\"Lato\"}h1{padding-top:20pt;color:#000000;font-size:20pt;padding-bottom:6pt;font-family:\"Lato\";line-height:1.1500000000000001;page-break-after:avoid;orphans:2;widows:2;text-align:left}h2{padding-top:18pt;color:#000000;font-size:16pt;padding-bottom:6pt;font-family:\"Lato\";line-height:1.1500000000000001;page-break-after:avoid;orphans:2;widows:2;text-align:left}h3{padding-top:16pt;color:#434343;font-size:14pt;padding-bottom:4pt;font-family:\"Lato\";line-height:1.1500000000000001;page-break-after:avoid;orphans:2;widows:2;text-align:left}h4{padding-top:14pt;color:#666666;font-size:12pt;padding-bottom:4pt;font-family:\"Lato\";line-height:1.1500000000000001;page-break-after:avoid;orphans:2;widows:2;text-align:left}h5{padding-top:12pt;color:#666666;font-size:11pt;padding-bottom:4pt;font-family:\"Lato\";line-height:1.1500000000000001;page-break-after:avoid;orphans:2;widows:2;text-align:left}h6{padding-top:12pt;color:#666666;font-size:11pt;padding-bottom:4pt;font-family:\"Lato\";line-height:1.1500000000000001;page-break-after:avoid;font-style:italic;orphans:2;widows:2;text-align:left}" }} />
      <p className="c9 title" id="h.30j0zll"><span className="c4">Terms and Conditions</span></p>
      <p className="c1 c3"><span className="c0" /></p>
      <p className="c1"><span className="c5">OUR COMMITMENT TO YOU</span></p>
      <p className="c1"><span className="c0">The ShaCar Group is an Australia based business providing a variety of vehicles at numerous locations. We are committed to providing quality service and value for</span></p>
      <p className="c1"><span className="c0">money.</span></p>
      <p className="c1 c3"><span className="c0" /></p>
      <p className="c1"><span className="c0">In particular:</span></p>
      <p className="c1"><span className="c0">• we provide only current model vehicles; and</span></p>
      <p className="c1"><span className="c0">• our vehicles are serviced and maintained in accordance with manufacturers’</span></p>
      <p className="c1"><span className="c0">recommendations.</span></p>
      <p className="c1 c3"><span className="c0" /></p>
      <p className="c1"><span className="c5">CONSUMER RIGHTS STATEMENT</span></p>
      <p className="c1"><span className="c0">All Your rights set out in this Hire Agreement are in addition to Your rights as a consumer (‘Your Consumer Rights’) under applicable consumer protection legislation, including the Australian Consumer Law.</span></p>
      <p className="c1"><span className="c0">Your Consumer Rights are not excluded, restricted or modified by this Hire Agreement. You can find out more about Your Consumer Rights from consumer organisations and bodies such as the Australian Competition and Consumer Commission and State/Territory fair trading authorities.</span></p>
      <p className="c1 c3"><span className="c0" /></p>
      <p className="c1"><span className="c5">YOUR FEEDBACK</span></p>
      <p className="c1"><span className="c0">We welcome Your feedback. Please tell us where we are going wrong by contacting us</span></p>
      <p className="c1"><span className="c0">through our app under the contact us section. (We would also like to hear about what we are doing right).</span></p>
      <p className="c1 c3"><span className="c0" /></p>
      <p className="c1 c3"><span className="c0" /></p>
      <p className="c1"><span className="c5">INTERPRETING YOUR HIRE AGREEMENT</span></p>
      <p className="c1"><span className="c0">1 The Hire Agreement between ShaCar and You is made on the date shown on the Hire Document You have accepted in respect of the Vehicle, and is made up of that Hire Document and these Terms and Conditions.</span></p>
      <p className="c1 c3"><span className="c0" /></p>
      <p className="c1"><span className="c0">In these Terms and Conditions:</span></p>
      <p className="c1"><span className="c0">‘Accessory’ means any equipment set out in the Hire Document, including (as</span></p>
      <p className="c1"><span className="c0">applicable) any global positioning system receiver or similar device or any child</span></p>
      <p className="c1"><span className="c0">restraint, booster or similar equipment; </span></p>
      <p className="c1"><span className="c0">ShaCar Insurance Policy’ means a policy of liability insurance held by ShaCar for Your and an Authorised Driver’s liability to a third party for damage to the property of that third party which is caused by the legal use of the Vehicle by You or an Authorised Driver;</span></p>
      <p className="c1"><span className="c0">‘Authorised Driver’ means:</span></p>
      <p className="c1"><span className="c0">• an additional driver who has been permitted by you to drive the vehicle;</span></p>
      <p className="c1"><span className="c0">• Your spouse; or</span></p>
      <p className="c1"><span className="c0">• Your employer or a fellow employee, if either is engaged in activities that are</span></p>
      <p className="c1"><span className="c0">incidental to Your business duties;</span></p>
      <p className="c1"><span>‘ShaCar’ means ShaCar Australia Pty Limited ABN </span><span>TOBEADDED</span><span className="c0">;</span></p>
      <p className="c1"><span className="c0">‘Collection Costs’ means ShaCar’s reasonable costs of collecting unpaid Hire</span></p>
      <p className="c1"><span className="c0">Charges from You (including ShaCar’s legal costs) and ShaCar’s administration fee of</span></p>
      <p className="c1"><span className="c0">$75 (incl GST) and its debt collection agent’s fee equal to 10% of the unpaid Hire</span></p>
      <p className="c1"><span className="c0">Charges;</span></p>
      <p className="c1"><span className="c0">‘Excess Amount’ means the amount shown as ‘Excess Amount’ on the Hire</span></p>
      <p className="c1"><span className="c0">Document;</span></p>
      <p className="c1"><span className="c0">‘Excess Reduction’ means the product called ‘Excess Reduction’ that You may</span></p>
      <p className="c1"><span className="c0">purchase before the hire commences to reduce any excess amount payable;</span></p>
      <p className="c1"><span className="c0">‘Late Return Charge’ means a charge of $40 (incl GST) payable by You if You do not</span></p>
      <p className="c1"><span className="c0">return the Vehicle on the date and by the time shown on the Hire Document or an</span></p>
      <p className="c1"><span className="c0">alternative return date and time as agreed with ShaCar under clause 7.1(a);</span></p>
      <p className="c1"><span className="c0">‘Loss Damage Waiver’ means the loss damage waiver described on the Hire</span></p>
      <p className="c1"><span className="c0">Document as LDW which reduces Your financial responsibility for loss or damage to</span></p>
      <p className="c1"><span className="c0">the Vehicle to the Excess Amount;</span></p>
      <p className="c1"><span className="c0">‘Manufacturer’s Specifications’ means the specifications of the manufacturer of</span></p>
      <p className="c1"><span className="c0">the Vehicle as set out in the Vehicle’s operations manual located in the glove box of</span></p>
      <p className="c1"><span className="c0">the Vehicle;</span></p>
      <p className="c1"><span className="c0">‘Overhead Damage’ means damage (excluding hail damage) to the Vehicle above</span></p>
      <p className="c1"><span className="c0">the top of the door seal or the top of the front and back windscreens, or damage to</span></p>
      <p className="c1"><span className="c0">third party property, caused by the Vehicle coming into contact with any thing</span></p>
      <p className="c1"><span className="c0">overhanging or obstructing its path, objects being placed on the roof of the Vehicle,</span></p>
      <p className="c1"><span className="c0">or You or any person standing or sitting on the roof of the Vehicle;</span></p>
      <p className="c1"><span className="c0">‘Protection Package’ means the package of products called ‘Protection Package’</span></p>
      <p className="c1"><span className="c0">which includes the Excess Reduction, Personal Accident Insurance and Personal</span></p>
      <p className="c1"><span className="c0">Effects and Baggage Insurance;</span></p>
      <p className="c1"><span className="c0">‘Hire Charges’ means the fees, costs, amounts and charges specified on the</span></p>
      <p className="c1"><span className="c0">Hire Document or payable under this Hire Agreement;</span></p>
      <p className="c1"><span className="c0">‘Hire Period’ means the period commencing on the date shown on the Hire</span></p>
      <p className="c1"><span className="c0">Document (our app) and ending on the date that You return the Vehicle to ShaCar;</span></p>
      <p className="c1"><span className="c0">‘Roadside Assistance Cover’ means, subject to clause 5.4, the provision of the</span></p>
      <p className="c1"><span className="c0">following services for the payment of the Roadside Assistance Cover fee specified in</span></p>
      <p className="c1"><span className="c0">the Hire Document: refuelling up to 6 litres where You run out of fuel, changing flat</span></p>
      <p className="c1"><span className="c0">tyres, provision of spare keys where You lose the keys to the Vehicle, unlocking the</span></p>
      <p className="c1"><span className="c0">Vehicle when You lock the keys in the Vehicle, and provision of a replacement battery</span></p>
      <p className="c1"><span className="c0">or ‘jump start’ where You have a flat battery if You leave the lights, air conditioning,</span></p>
      <p className="c1"><span className="c0">entertainment system(s) or other electrical equipment running while the ignition is off.</span></p>
      <p className="c1"><span className="c0">‘Roadside Assistance Fee’ means a minimum charge of $198 (incl GST), or such</span></p>
      <p className="c1"><span className="c0">other amount as reasonably determined by ShaCar having regard to the roadside</span></p>
      <p className="c1"><span className="c0">assistance callout event (for example: a lost key can cost up to $670 incl GST to</span></p>
      <p className="c1"><span className="c0">replace).</span></p>
      <p className="c1"><span className="c0">‘Substitute Vehicle Insurance’ means a policy of motor vehicle insurance held by</span></p>
      <p className="c1"><span className="c0">You or an Authorised Driver which covers You or the Authorised Driver while using</span></p>
      <p className="c1"><span className="c0">the Vehicle as a substitute for the vehicle insured under that policy;</span></p>
      <p className="c1"><span className="c0">‘Underbody Damage’ means damage to the Vehicle during the Hire Period</span></p>
      <p className="c1"><span className="c0">caused by the Vehicle coming into contact with any thing below the bottom of the</span></p>
      <p className="c1"><span className="c0">door seal and the bottom of the front and rear bumper bars where ShaCar considers,</span></p>
      <p className="c1"><span className="c0">acting reasonably, that the driver of the Vehicle is reasonably at fault for that damage;</span></p>
      <p className="c1"><span className="c0">‘Vehicle’ means the vehicle described on the Hire Document (or any substitute</span></p>
      <p className="c1"><span className="c0">vehicle), and includes its parts, components, keys, remote opening devices, any tag</span></p>
      <p className="c1"><span className="c0">or device for paying electronic tolls, all Accessories and contents supplied by</span></p>
      <p className="c1"><span className="c0">ShaCar; and</span></p>
      <p className="c1"><span className="c0">‘You’ or ‘Your’ refers to the person(s) with whom the Hire Agreement is made;</span></p>
      <p className="c1"><span className="c0">‘Your Account’ means Your debit card, credit card or ShaCar charge account to</span></p>
      <p className="c1"><span className="c0">which Your Hire Charges are to be debited.</span></p>
      <p className="c1 c3"><span className="c0" /></p>
      <p className="c1"><span className="c6">DRIVER</span></p>
      <p className="c1"><span className="c0">1.1 You agree and acknowledge that:</span></p>
      <p className="c1"><span className="c0">(a) only You or a Driver authorised by you will drive the Vehicle; and</span></p>
      <p className="c1"><span className="c0">(b) You and any Driver authorised by you hold a current licence (not being a learner’s</span></p>
      <p className="c1"><span className="c0">licence or provisional licence) to drive the Vehicle and have been licensed to</span></p>
      <p className="c1"><span className="c0">drive vehicles of the same category as the Vehicle for at least 12 consecutive</span></p>
      <p className="c1"><span className="c0">months.</span></p>
      <p className="c1"><span className="c0">1.2 You are responsible for the acts and omissions of an Authorised Driver or any other</span></p>
      <p className="c1"><span className="c0">person You allow to drive the Vehicle and neither You nor any unauthorised driver will</span></p>
      <p className="c1"><span className="c0">have the benefit of the Loss Damage Waiver option or Excess Reduction option (if</span></p>
      <p className="c1"><span className="c0">accepted or included in Your rate) if You allow an unauthorised driver to drive the</span></p>
      <p className="c1"><span className="c0">Vehicle and that unauthorised driver causes loss of or damage to the Vehicle or</span></p>
      <p className="c1"><span className="c0">damage to the property of a third person.</span></p>
      <p className="c1 c3"><span className="c0" /></p>
      <p className="c1"><span className="c5">WHERE YOU CAN AND CANNOT DRIVE THE VEHICLE</span></p>
      <p className="c1"><span>2</span><span className="c0">.1 You and any Driver authorised by you must only use the Vehicle:</span></p>
      <p className="c1"><span className="c0">(a) on a road which is properly formed and constructed as a sealed, metalled or</span></p>
      <p className="c1"><span className="c0">gravel road (unless the Vehicle is a 4 wheel drive Vehicle and in Western</span></p>
      <p className="c1"><span className="c0">Australia where it may only be used on graded, unsealed roads unless</span></p>
      <p className="c1"><span className="c0">approved in writing);</span></p>
      <p className="c1"><span className="c0">(b) In Western Australia You and any Driver authorised by you must not use the vehicle off road (e.g. on a fire trail, beach, track, grassed area or to cross streams or any</span></p>
      <p className="c1"><span className="c0">other body of water) unless you have authorisation from ShaCar in writing.</span></p>
      <p className="c1"><span className="c0">2.2 You and any Driver authorised by you must not, unless authorised in writing by ShaCar, drive or take the Vehicle:</span></p>
      <p className="c1"><span className="c0">(a) to Gove Peninsula or any island off the coast of Australia (including, but not</span></p>
      <p className="c1"><span className="c0">limited to, Bruny Island, Fraser Island, Groote Eylandt, or the Tiwi Islands):</span></p>
      <p className="c1"><span className="c0">(b) to Kangaroo Island; however, if so authorised, You and any Driver authorised by you must not drive the Vehicle between dusk and dawn outside the town limits;</span></p>
      <p className="c1"><span className="c0">(c) into or out of the Northern Territory, Western Australia or Tasmania;</span></p>
      <p className="c1"><span className="c0">(d) in Queensland:</span></p>
      <p className="c1"><span className="c0">(1) on Highway No. 27: beyond Chillagoe in a Westerly direction;</span></p>
      <p className="c1"><span className="c0">(2) on Highway No. 1: beyond Normanton in a Southerly direction and no</span></p>
      <p className="c1"><span className="c0">further North than Karumba;</span></p>
      <p className="c1"><span className="c0">(3) if the Vehicle is a passenger vehicle or truck, beyond Cooktown to the</span></p>
      <p className="c1"><span className="c0">North or Lakeland to the West and no further North than Cape Tribulation</span></p>
      <p className="c1"><span className="c0">on the Coast Road; or</span></p>
      <p className="c1"><span className="c0">(4) on the Coast Road from Helenvale to Cape Tribulation, or from Laura to</span></p>
      <p className="c1"><span className="c0">Lakeland, unless the Vehicle is a 4 wheel drive vehicle;</span></p>
      <p className="c1"><span className="c0">(e) in the snow (at any time and anywhere (including Tasmania));</span></p>
      <p className="c1"><span className="c0">(f) above the snow line in:</span></p>
      <p className="c1"><span className="c0">(1) New South Wales (being Jindabyne); or</span></p>
      <p className="c1"><span className="c0">(2) Victoria (being Bright), from the beginning of June until the end of September;</span></p>
      <p className="c1"><span className="c0">(g) on beaches or through streams, dams, rivers or flood waters;</span></p>
      <p className="c1"><span className="c0">(h) in Western Australia:</span></p>
      <p className="c1"><span className="c0">(1) to any parts North of Carnarvon;</span></p>
      <p className="c1"><span className="c0">(2) on the Gibb River Road, Cape Leveque Road, Widdjana Gorge, Canning</span></p>
      <p className="c1"><span className="c0">Stock Route, Gunbarrel Highway and Holland Track;</span></p>
      <p className="c1"><span className="c0">(3) beyond 100 kilometres of the Perth city limits between dusk and dawn; or</span></p>
      <p className="c1"><span className="c0">(4) otherwise, outside any town or city limits between dusk and dawn; or</span></p>
      <p className="c1"><span className="c0">(i) in the Northern Territory:</span></p>
      <p className="c1"><span className="c0">(1) on the Jim Jim Falls Road to Jim Jim Falls and Twin Falls; or</span></p>
      <p className="c1"><span className="c0">(2) outside any town or city limits between dusk and dawn.</span></p>
      <p className="c1 c3"><span className="c0" /></p>
      <p className="c1"><span className="c5">USE OF THE VEHICLE</span></p>
      <p className="c1"><span>3</span><span className="c0">.1 You and any Driver authorised by you must:</span></p>
      <p className="c1"><span className="c0">(a) not use, or allow the Vehicle to be used, for any illegal purpose, race, contest or</span></p>
      <p className="c1"><span className="c0">performance test of any kind;</span></p>
      <p className="c1"><span className="c0">(b) not, without ShaCar’s prior written consent, use, or allow the Vehicle to be used,</span></p>
      <p className="c1"><span className="c0">to push anything;</span></p>
      <p className="c1"><span className="c0">(c) not carry, or allow the Vehicle to carry, more passengers than may be properly</span></p>
      <p className="c1"><span className="c0">accommodated by the seat belt restraints provided in the Vehicle;</span></p>
      <p className="c1"><span className="c0">(d) not be under the influence of alcohol, drugs or have a blood alcohol content that</span></p>
      <p className="c1"><span className="c0">exceeds the legal limit in the State or Territory in which the Vehicle is driven;</span></p>
      <p className="c1"><span className="c0">(e) not, without ShaCar’s prior written consent, use or allow the Vehicle to be used</span></p>
      <p className="c1"><span className="c0">to carry passengers for payment of any kind;</span></p>
      <p className="c1"><span className="c0">(f) not use the Vehicle when it is damaged or unsafe;</span></p>
      <p className="c1"><span className="c0">(g) provided it is reasonable in the circumstances to do so, not drive the Vehicle after</span></p>
      <p className="c1"><span className="c0">an accident or hitting an object (including an animal) until You have obtained</span></p>
      <p className="c1"><span className="c0">ShaCar’s approval to do so;</span></p>
      <p className="c1"><span className="c0">(h) not use the Vehicle to transport goods, except in compliance with all necessary</span></p>
      <p className="c1"><span className="c0">approvals, permits, licences and government requirements (to be obtained at</span></p>
      <p className="c1"><span className="c0">Your cost) and in accordance with the Manufacturer’s Specifications and ShaCar’s</span></p>
      <p className="c1"><span className="c0">recommendations;</span></p>
      <p className="c1"><span className="c0">(i) not smoke within the Vehicle or allow any other person to smoke within the</span></p>
      <p className="c1"><span className="c0">Vehicle at any time;</span></p>
      <p className="c1"><span className="c0">(j) not, without ShaCar’s prior written consent, use the Vehicle to carry any</span></p>
      <p className="c1"><span className="c0">inflammable substance which has a flash point under 22.8°C or any other</span></p>
      <p className="c1"><span className="c0">explosive or corrosive substances;</span></p>
      <p className="c1"><span className="c0">(k) not use the Vehicle for the conveyance or towing of any load unless You have</span></p>
      <p className="c1"><span className="c0">ShaCar’s prior written consent; the load is correctly loaded and secured and not</span></p>
      <p className="c1"><span className="c0">in excess of that for which the Vehicle was manufactured; for towing, the Vehicle</span></p>
      <p className="c1"><span className="c0">is fitted with a tow bar; and the conveyance or towing is undertaken in accordance</span></p>
      <p className="c1"><span className="c0">with the Manufacturer’s Specifications and ShaCar’s recommendations; and</span></p>
      <p className="c1"><span className="c0">(l) not use the Vehicle in contravention of any law.</span></p>
      <p className="c1"><span className="c0">3.2 You must pay the Roadside Assistance Fees (unless you have purchased Roadside</span></p>
      <p className="c1"><span className="c0">Assistance Cover), and for any professional cleaning or odour extraction required</span></p>
      <p className="c1"><span className="c0">because You or another person has been smoking within the Vehicle and for all</span></p>
      <p className="c1"><span className="c0">parking, speeding and traffic infringements and tolls in respect of the Vehicle during</span></p>
      <p className="c1"><span className="c0">the Hire Period.</span></p>
      <p className="c1 c3"><span className="c0" /></p>
      <p className="c1"><span className="c5">MAINTENANCE, SECURITY AND SAFETY</span></p>
      <p className="c1"><span>4</span><span className="c0">.1 You and any Driver authorised by you must:</span></p>
      <p className="c1"><span className="c0">(a) maintain all of the Vehicle’s engine oils and engine coolant levels to the</span></p>
      <p className="c1"><span className="c0">Manufacturer’s Specifications, provided that ShaCar has provided the Vehicle to</span></p>
      <p className="c1"><span className="c0">You with engine oils and engine coolant at levels which reflect the Manufacturer’s</span></p>
      <p className="c1"><span className="c0">Specifications;</span></p>
      <p className="c1"><span className="c0">(b) fill the Vehicle with only the fuel type specified in the Manufacturer’s Specifications;</span></p>
      <p className="c1"><span className="c0">(c) keep the Vehicle locked when it is unattended and the keys under Your or the</span></p>
      <p className="c1"><span className="c0">Authorised Driver’s personal control at all times; and</span></p>
      <p className="c1"><span className="c0">(d) comply with all applicable seat belt and child restraint laws.</span></p>
      <p className="c1"><span className="c0">4.2 ShaCar will provide 24 hour roadside assistance for all inhehire mechanical faults (as reasonably determined by ShaCar or its authorised repairer) at no additional cost</span></p>
      <p className="c1"><span className="c0">provided that the fault does not arise as a result of any unauthorised use of the Vehicle</span></p>
      <p className="c1"><span className="c0">in breach of clauses 1 or 3.1 (save, in respect of clause 3.1(l), for minor infractions).</span></p>
      <p className="c1"><span className="c0">4.3 For each roadside assistance callout (for refuelling, a ‘jump start’, a tyre related incident,</span></p>
      <p className="c1"><span className="c0">lost keys, keys locked in vehicle, or a flat battery due to lights or other electrical</span></p>
      <p className="c1"><span className="c0">equipment being left on), You will be charged the Roadside Assistance Fee, unless you</span></p>
      <p className="c1"><span className="c0">have purchased Roadside Assistance Cover.</span></p>
      <p className="c1"><span className="c0">4.4 Roadside Assistance Cover does not apply if the Vehicle has been used in breach of clauses 1 or 3.1 or in respect of any additional amount(s) payable under clause 7.5</span></p>
      <p className="c1"><span className="c0">(save, in respect of clause 3.1(l), for minor infractions).</span></p>
      <p className="c1"><span className="c0">4.5 You must not have repairs to the Vehicle carried out unless ShaCar authorises You to</span></p>
      <p className="c1"><span className="c0">do so. ShaCar requires verification of the cost of repairs for reimbursement and GST</span></p>
      <p className="c1"><span className="c0">purposes. You should obtain an original tax invoice/receipt to assist ShaCar. ShaCar</span></p>
      <p className="c1"><span className="c0">will reimburse You for any repairs to the Vehicle authorised by it, provided that the cost</span></p>
      <p className="c1"><span className="c0">of those repairs is verified. To the extent that ShaCar cannot verify the cost of repairs,</span></p>
      <p className="c1"><span className="c0">ShaCar will not reimburse You.</span></p>
      <p className="c1 c3"><span className="c0" /></p>
      <p className="c1"><span className="c5">FUEL</span></p>
      <p className="c1"><span>5.</span><span className="c0">1 You must fill the Vehicle only with the fuel type specified in the Manufacturer’s Specifications.</span></p>
      <p className="c1"><span className="c0">5.2 If you return the Vehicle with less fuel than it had when You hired it, You must pay the Fuel Service amount per litre as set out on the Hire Document. This amount reflects the cost of fuel per litre plus ShaCar’s costs associated with arranging to fill the Vehicle with fuel.</span></p>
      <p className="c1"><span className="c0">5.3 For the purpose of 5.2, the fuel level of the Vehicle at the time You hire it and at the time You return it to ShaCar is determined by the onboard hardware in the Vehicle, and the kilometres driven. However, if a Fuel Service amount is charged, that amount will be based on the number of litres of fuel actually put into the Vehicle to return it to the level of fuel that the Vehicle had when You hired it.</span></p>
      <p className="c1 c3"><span className="c0" /></p>
      <p className="c1"><span className="c5">RETURN OF VEHICLE</span></p>
      <p className="c1"><span>7</span><span className="c0">.1 You must return the Vehicle to ShaCar:</span></p>
      <p className="c1"><span className="c0">(a) to the place, on the date and by the time shown on the Hire Document unless</span></p>
      <p className="c1"><span className="c0">you have informed ShaCar of a change prior to the return date and ShaCar has</span></p>
      <p className="c1"><span className="c0">agreed to the change; and</span></p>
      <p className="c1"><span className="c0">(b) in the same condition as it was at the commencement of the Hire Period, fair</span></p>
      <p className="c1"><span className="c0">wear and tear excepted.</span></p>
      <p className="c1"><span className="c0">7.2 If You tell ShaCar that You wish to return the Vehicle to a location other than that stated on the Hire Document, ShaCar will advise You of the amount of the ‘one-way fee’ that You will incur (unless clause 7.5(a) applies to You). If You do not tell ShaCar in advance, You must pay a ‘one-way fee’ of up to $2 per kilometre (depending on the type of Vehicle and the distance travelled) to be determined and paid at the end of the Hire Period. You will also be liable for any Hire Charges calculated under clause 7.4.</span></p>
      <p className="c1"><span className="c0">7.3 Despite clauses 7.1 and 7.2, You must return the Vehicle to a ShaCar location during normal operating hours.</span></p>
      <p className="c1"><span className="c0">7.4 If:</span></p>
      <p className="c1"><span className="c0">(a) You return the Vehicle on a date, or at a time, or to a place other than that shown</span></p>
      <p className="c1"><span className="c0">on the Hire Document; or</span></p>
      <p className="c1"><span className="c0">(b) You do not comply with any special conditions set out in the ‘Rates’ section on the</span></p>
      <p className="c1"><span className="c0">Hire Document,</span></p>
      <p className="c1"><span className="c0">then the rates shown on the Hire Document will not apply and You must pay the rate</span></p>
      <p className="c1"><span className="c0">that in the circumstances is reasonably applicable for the Vehicle for the Hire Period</span></p>
      <p className="c1"><span className="c0">(which is likely to be higher than the rates shown on the Hire Document) plus the Late</span></p>
      <p className="c1"><span className="c0">Return Charge.</span></p>
      <p className="c1"><span className="c0">7.5 ShaCar may request the immediate return of the Vehicle, or ShaCar may recover the</span></p>
      <p className="c1"><span className="c0">Vehicle without notice, if:</span></p>
      <p className="c1"><span className="c0">(a) the credit limit on Your method of payment would be exceeded by the debiting</span></p>
      <p className="c1"><span className="c0">of the Hire Charges for a requested extension of the hire of the Vehicle or if</span></p>
      <p className="c1"><span className="c0">a ‘one-way fee’ becomes payable by You;</span></p>
      <p className="c1"><span className="c0">(b) the Hire Period expires without satisfactory arrangements having been made</span></p>
      <p className="c1"><span className="c0">by You with ShaCar; or</span></p>
      <p className="c1"><span className="c0">(c) ShaCar reasonably suspects that:</span></p>
      <p className="c1"><span className="c0">(1) the Vehicle may be used for an unlawful purpose;</span></p>
      <p className="c1"><span className="c0">(2) damage to the Vehicle, or injury to persons or property, is likely to occur; or</span></p>
      <p className="c1"><span className="c0">(3) the Vehicle will be involved in an industrial dispute.</span></p>
      <p className="c1"><span className="c0">7.6 If You do not return the Vehicle on the date and by the time shown on the Hire</span></p>
      <p className="c1"><span className="c0">Document (or any extended date or time agreed with ShaCar) then:</span></p>
      <p className="c1"><span className="c0">(a) after written notice to You and if the location of the Vehicle is unknown, ShaCar</span></p>
      <p className="c1"><span className="c0">may report the Vehicle as stolen to the Police; and</span></p>
      <p className="c1"><span className="c0">(b) You must pay ShaCar all Hire Charges (including additional Hire Charges)</span></p>
      <p className="c1"><span className="c0">and compensate ShaCar in accordance with clause 8 for any loss ShaCar suffers</span></p>
      <p className="c1"><span className="c0">(including all reasonably additional costs ShaCar incurs in recovering the Vehicle)</span></p>
      <p className="c1"><span className="c0">up to the time that the Vehicle is recovered by ShaCar.</span></p>
      <p className="c1 c3"><span className="c0" /></p>
      <p className="c1"><span className="c5">LOSS DAMAGE WAIVER, DAMAGE AND LOSS OF PROPERTY</span></p>
      <p className="c1"><span className="c0">8.1 Subject to this clause 8, You are liable:</span></p>
      <p className="c1"><span className="c0">(a) for the loss of, and all damage to, the Vehicle during the Hire Period; and</span></p>
      <p className="c1"><span className="c0">(b) for all damage to the property of any person:</span></p>
      <p className="c1"><span className="c0">(i) which is caused or contributed to by You or any person You allow to drive</span></p>
      <p className="c1"><span className="c0">the Vehicle; or</span></p>
      <p className="c1"><span className="c0">(ii) which arises from the use of the Vehicle by You or any person You allow to</span></p>
      <p className="c1"><span className="c0">drive the Vehicle.</span></p>
      <p className="c1"><span className="c0">This clause 8 does not apply to any damage or loss for which ShaCar is liable to You</span></p>
      <p className="c1"><span className="c0">under this Hire Agreement.</span></p>
      <p className="c1"><span className="c0">Remember that references to the ‘Vehicle’ include all of its parts, components, Accessories and contents (see the definitions of ‘Vehicle’ and ‘Accessory’ in clause 1).</span></p>
      <p className="c1"><span className="c0">8.2 Subject to clauses 8.5 and 8.6, ShaCar waives Your liability under clause 8.1 for</span></p>
      <p className="c1"><span className="c0">damage to, or loss of, the Vehicle and will ensure that You and any Driver authorised by you</span></p>
      <p className="c1"><span className="c0">are entitled to be indemnified under the ShaCar Insurance Policy, if:</span></p>
      <p className="c1"><span className="c0">(a) You accept and pay for the Loss Damage Waiver option on the Hire Document</span></p>
      <p className="c1"><span className="c0">(or if it is included in Your rate); and</span></p>
      <p className="c1"><span className="c0">(b) You pay the Excess Amount for each separate event involving:</span></p>
      <p className="c1"><span className="c0">(i) damage (including hail damage) to, or loss of, the Vehicle; or</span></p>
      <p className="c1"><span className="c0">(ii) damage to the property of any third party which is caused by the use of the</span></p>
      <p className="c1"><span className="c0">Vehicle by You or an Authorised Driver.</span></p>
      <p className="c1"><span className="c0">8.3 In the event of an unintended collision between the Vehicle and any other object,</span></p>
      <p className="c1"><span className="c0">including another vehicle, during the Hire Period that results in damage to the</span></p>
      <p className="c1"><span className="c0">Vehicle or to the property of any third party, ShaCar waives Your liability under clause</span></p>
      <p className="c1"><span className="c0">8.1 and will ensure that You are entitled to be indemnified under the ShaCar Insurance</span></p>
      <p className="c1"><span className="c0">Policy, and We will refund You any Excess Amount You paid ShaCar, provided that,</span></p>
      <p className="c1"><span className="c0">acting reasonably, ShaCar agrees that You or an Authorised Driver were not at fault</span></p>
      <p className="c1"><span className="c0">and:</span></p>
      <p className="c1" id="h.3znysh7"><span className="c0">(a) You and any Driver authorised by you hold a current drivers licence;</span></p>
      <p className="c1"><span className="c0">(b) You have provided ShaCar with any details of the incident that ShaCar</span></p>
      <p className="c1"><span className="c0">reasonably requests including:</span></p>
      <p className="c1"><span className="c0">(1) the name, residential address, contact phone and licence number of any</span></p>
      <p className="c1"><span className="c0">person involved;</span></p>
      <p className="c1"><span className="c0">(2) the registration numbers of all vehicles involved;</span></p>
      <p className="c1"><span className="c0">(3) an accurate description of the incident and location; and</span></p>
      <p className="c1"><span className="c0">(4) the names of any attending police officers and the stations at which they</span></p>
      <p className="c1"><span className="c0">are based; and</span></p>
      <p className="c1"><span className="c0">(c) You have supplied or ShaCar has established the name of the insurer of any third</span></p>
      <p className="c1"><span className="c0">party You believe was at fault and ShaCar reasonably believes that the insurer will</span></p>
      <p className="c1"><span className="c0">pay ShaCar for the loss or damage.</span></p>
      <p className="c1"><span className="c0">8.4 If clause 8.3 applies, ShaCar may debit Your Account with the Excess Amount at the time of loss of, or damage to, the Vehicle, however when ShaCar reasonably believes that the insurer of a third party will pay ShaCar for the loss or damage, ShaCar will, within a reasonable period of time, refund You the Excess Amount You paid.</span></p>
      <p className="c1 c3"><span className="c0" /></p>
      <p className="c1"><span className="c0">PAYMENT</span></p>
      <p className="c1"><span className="c0">9.1 At the end of the Hire Period, You must pay ShaCar:</span></p>
      <p className="c1"><span className="c0">(a) all Hire Charges;</span></p>
      <p className="c1"><span className="c0">(b) any amount paid or payable by ShaCar or You to any person arising out of Your</span></p>
      <p className="c1"><span className="c0">use of the Vehicle or imposed on You or ShaCar by any government or other</span></p>
      <p className="c1"><span className="c0">competent authority;</span></p>
      <p className="c1"><span className="c0">(c) the replacement cost (as reasonably determined by ShaCar) for a lost or stolen</span></p>
      <p className="c1"><span className="c0">Accessory; and</span></p>
      <p className="c1"><span className="c0">(d) any amount which You reasonably owe to ShaCar under the Hire Agreement,</span></p>
      <p className="c1"><span className="c0">in respect of a breach of the Hire Agreement or otherwise. ShaCar will provide</span></p>
      <p className="c1"><span className="c0">details to You of any amount payable under this clause 9.1.</span></p>
      <p className="c1"><span className="c0">9.2 Each Hire Charge calculated and invoiced to You at the time of the return of the</span></p>
      <p className="c1"><span className="c0">Vehicle is subject to subsequent verification by ShaCar. If ShaCar reasonably</span></p>
      <p className="c1"><span className="c0">determines that a Hire Charge should be adjusted, ShaCar will provide details to</span></p>
      <p className="c1"><span className="c0">You if ShaCar has Your contact details.</span></p>
      <p className="c1"><span className="c0">9.3 The minimum charge You must pay for the hire of the Vehicle is an amount</span></p>
      <p className="c1"><span className="c0">equivalent to:</span></p>
      <p className="c1"><span className="c0">(a) one day’s hire at the ‘daily rate’ shown on the Hire Document (subject to</span></p>
      <p className="c1"><span className="c0">clause 7.4); plus</span></p>
      <p className="c1"><span className="c0">(b) the amount payable for the number of hours hired during the Hire Period.</span></p>
      <p className="c1"><span className="c0">9.4 Distance charges are measured from the Vehicle’s odometer.</span></p>
      <p className="c1"><span className="c0">9.5 You authorise ShaCar to charge all amounts payable to ShaCar under the Hire</span></p>
      <p className="c1"><span className="c0">Agreement to Your Account.</span></p>
      <p className="c1"><span className="c0">9.6 If You pay Your Hire Charges by debit card, You acknowledge that it may take up to</span></p>
      <p className="c1"><span className="c0">7–10 business days for Your financial institution to release any amount which has been</span></p>
      <p className="c1"><span className="c0">authorised by that institution at the request of ShaCar under clause 9.5 which is in</span></p>
      <p className="c1"><span className="c0">excess of Your Hire Charges.</span></p>
      <p className="c1"><span className="c0">9.7 ShaCar will pay, within 14 days, any refund due to You by such method as ShaCar may</span></p>
      <p className="c1"><span className="c0">reasonably choose.</span></p>
      <p className="c1"><span className="c0">9.8 If You fail to pay any amount due under or in connection with the Hire Agreement</span></p>
      <p className="c1"><span className="c0">within 14 days of the date by which You were required to pay the amount, You must</span></p>
      <p className="c1"><span className="c0">also pay ShaCar:</span></p>
      <p className="c1"><span className="c0">(a) interest at 10% per annum (compounded daily) on the amount from the expiry</span></p>
      <p className="c1"><span className="c0">of 14 days from the date on which You were required to pay the amount to the</span></p>
      <p className="c1"><span className="c0">date of payment; and</span></p>
      <p className="c1"><span className="c0">(b) on and as demanded, ShaCar’s Collection Costs including interest on ShaCar’s</span></p>
      <p className="c1"><span className="c0">Collection Costs calculated in accordance with clause 9.8(a) from the date of</span></p>
      <p className="c1"><span className="c0">demand.</span></p>
      <p className="c1 c3"><span className="c0" /></p>
      <p className="c1"><span className="c0">TERMINATION</span></p>
      <p className="c1"><span className="c0">10.1 Either party may terminate the Hire Agreement at any time if the other party</span></p>
      <p className="c1"><span className="c0">commits a material breach of the Hire Agreement.</span></p>
      <p className="c1"><span className="c0">10.2 Subject to clauses 7.2 to 7.6 (inclusive) and 9.3, You may terminate the Hire</span></p>
      <p className="c1"><span className="c0">Agreement at any time by returning the Vehicle to ShaCar.</span></p>
      <p className="c1 c3"><span className="c0" /></p>
      <p className="c1 c3"><span className="c0" /></p>
      <p className="c1"><span className="c0">PROPERTY IN VEHICLE</span></p>
      <p className="c1"><span className="c0">11 Unless ShaCar or a ShaCar employee acting in the course of their employment is</span></p>
      <p className="c1"><span className="c0">negligent, or fraudulent, ShaCar is not liable to any person for any loss of, or damage</span></p>
      <p className="c1"><span className="c0">to any property:</span></p>
      <p className="c1"><span className="c0">(a) left in the Vehicle after its return to ShaCar; or</span></p>
      <p className="c1"><span className="c0">(b) stolen from the Vehicle or otherwise lost during the hire.</span></p>
      <p className="c1 c3"><span className="c0" /></p>
      <p className="c1"><span className="c0">PERSONAL PROPERTY SECURITIES LAW</span></p>
      <p className="c1"><span className="c0">12.1 The following terms have their respective meanings in the Personal Property Securities</span></p>
      <p className="c1"><span className="c0">Act 2009 (Cth) (‘PPSA’) – financing statement, interested person, register,</span></p>
      <p className="c1"><span className="c0">proceeds, security agreement and security interest.</span></p>
      <p className="c1"><span className="c0">12.2 You acknowledge that:</span></p>
      <p className="c1"><span className="c0">(a) by hiring the Vehicle from ShaCar, You may be granting a security interest in</span></p>
      <p className="c1"><span className="c0">the Vehicle (and any proceeds) to ShaCar, and that this Hire Agreement may</span></p>
      <p className="c1"><span className="c0">constitute a security agreement;</span></p>
      <p className="c1"><span className="c0">(b) any security interest arising under this Hire Agreement attaches to the Vehicle</span></p>
      <p className="c1"><span className="c0">when You obtain possession of the Vehicle and not at any other time; and</span></p>
      <p className="c1"><span className="c0">(c) ShaCar may perfect its security interest by lodging a financing statement on the</span></p>
      <p className="c1"><span className="c0">PPSA register.</span></p>
      <p className="c1"><span className="c0">12.3 ShaCar does not need to give You any notice under the PPSA (including a notice of a</span></p>
      <p className="c1"><span className="c0">verification statement) unless the notice is required by the PPSA and that requirement</span></p>
      <p className="c1"><span className="c0">cannot be excluded.</span></p>
      <p className="c1"><span className="c0">12.4 You must do anything reasonably required by ShaCar to enable ShaCar to register its</span></p>
      <p className="c1"><span className="c0">security interest, with the priority it requires, and to maintain the registration.</span></p>
    </div>
    
    );
  }
}

export default App;