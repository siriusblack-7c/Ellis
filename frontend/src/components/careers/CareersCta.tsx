import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

export default function CareersCta() {
    return (
        <section className="py-20">
            <div className="container mx-auto px-4 text-center">
                <h2 className="text-3xl font-bold mb-4">Ready to Launch Your Caregiving Career?</h2>
                <p className="text-gray-600 dark:text-gray-300 mb-8 text-center">
                    Join Ellis and become a certified personal support worker with sponsored training and global career opportunities.
                </p>
                <div className="flex flex-col gap-4 max-w-4xl mx-auto text-left mb-8">
                    <h3 className="text-xl font-semibold mb-4 border-b pb-2 text-center">PERSONAL SUPPORT WORKER / CAREGIVER</h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-2 text-center">Now Hiring for various countries</p>
                    <p className="text-gray-600 dark:text-gray-300 mb-2 text-center">Full job description</p>

                    <p className="text-gray-600 dark:text-gray-300 mb-8">Ellis care global limited is a Canadian company striving to become the global leading provider of assisted living services. We provide at-home care directly and through partners in 21 countries. Our team is made up of over 2,000 caring and committed professionals who love what they do. Our providers tell us: “Home care is where I can truly make a difference. There is such a sense of accomplishment from helping people live independently at home.” Our teams work together to provide high quality, client-centred care to those who need it most in their homes, schools, and other community settings. Many of our team members manage their own schedules in the community and they say, “The freedom and flexibility can’t be beat.” Providers form meaningful bonds with the clients and families they serve over time and are supported by a diverse regional team and beneficial home office programs. Team members tell us</p>
                    <h3 className="text-xl font-semibold mb-4 border-b pb-2 text-center">Key Areas of Accountability</h3>

                    <p className="text-gray-600 dark:text-gray-300 mb-2">Our Personal Support Workers (PSWs) help clients live more comfortably, safely and as independently as possible. Their skilled, compassionate support can also be a great assistance to family caregivers looking for a much needed break. Personal support workers assist our clients with, but not limited to:</p>

                    <p className="text-gray-600 dark:text-gray-300">1. Activities of daily living such as grooming, dressing and bathing</p>
                    <p className="text-gray-600 dark:text-gray-300">2. Meal planning and preparation</p>
                    <p className="text-gray-600 dark:text-gray-300">3. Mobility and transfers</p>
                    <p className="text-gray-600 dark:text-gray-300">4. Light household duties such as cleaning, laundry and washing dishes</p>
                    <p className="text-gray-600 dark:text-gray-300">5. Provision of special functions that have been taught, with respect to the client by a regulated health professional.</p>
                    <p className="text-gray-600 dark:text-gray-300">6. Reporting changes in client behavior and condition</p>

                    <h3 className="text-xl font-semibold mb-4 border-b pb-2 text-center mt-2">Required Qualifications:</h3>

                    <p className="text-gray-600 dark:text-gray-300">1. PSW certification from an approved and recognized educational institution (we sponsor training and certification)</p>
                    <p className="text-gray-600 dark:text-gray-300">2. RN/RPN/DSW/HCA/Personal Attendant certification, previous Paramedic training is an asset</p>
                    <p className="text-gray-600 dark:text-gray-300">3. Ability to read, write, and speak English (equivalent to grade 10 level)</p>
                    <p className="text-gray-600 dark:text-gray-300">4. Must be available to work on the weekends or rotational weekends</p>
                    <p className="text-gray-600 dark:text-gray-300">5. Ability to travel between assignments within designated areas of work</p>
                    <p className="text-gray-600 dark:text-gray-300">6. Demonstrated commitment to client and family</p>
                    <p className="text-gray-600 dark:text-gray-300">7. Willingness to work with a diverse client base including clients who are elderly, physically challenged and with mental health conditions</p>
                    <p className="text-gray-600 dark:text-gray-300">8. Demonstrated ability to recognize safety concerns, communicate effectively using a computer and/or mobile device</p>
                    <p className="text-gray-600 dark:text-gray-300">9. Requires good judgement, the ability to work independently, and work cooperatively with an interdisciplinary team</p>
                    <p className="text-gray-600 dark:text-gray-300">10. Immunization for measles, rubella, and varicella, and prophylaxis immunization of Hepatitis B is strongly urged. Must be screened for tuberculosis where required.</p>
                    <p className="text-gray-600 dark:text-gray-300">11. Current CPR and First Aid certification</p>
                    <p className="text-gray-600 dark:text-gray-300">12. Ability to speak a second language is a definite asset.</p>

                    <h3 className="text-xl font-semibold mb-4 border-b pb-2 text-center mt-2">What makes Ellis Care Global Ltd. compensation unique?</h3>

                    <p className="text-gray-600 dark:text-gray-300">1. Benefits and pension plan for permanent eligible employees</p>
                    <p className="text-gray-600 dark:text-gray-300">2. Compensation for education and professional development</p>
                    <p className="text-gray-600 dark:text-gray-300">3. ECGL is a leading learning organization so we can provide you with comprehensive orientation and training at the start and throughout your career</p>
                    <p className="text-gray-600 dark:text-gray-300">4. Mentorship and peer support</p>
                    <p className="text-gray-600 dark:text-gray-300">5. Career development opportunities</p>
                    <p className="text-gray-600 dark:text-gray-300">6. Employee and family assistance program</p>
                    <p className="text-gray-600 dark:text-gray-300">7. Wellness resources</p>
                    <p className="text-gray-600 dark:text-gray-300">8. Staff & service provider events</p>
                </div>
                <Button asChild className="btn-primary">
                    <Link to="/application/step-1">
                        Start Application Process <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                </Button>
            </div>
        </section>
    );
} 