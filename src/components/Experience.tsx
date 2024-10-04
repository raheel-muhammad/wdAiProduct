import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Image from 'next/image';
import Calender from '../assets/Calendar.svg';
import Button from './Button';
import TopProjects from '@/components/Projects';

interface ExperienceProps {
    setActiveIndex: (index: number) => void;
}

interface JobExperience {
    companyName: string;
    joiningDate: Date | null;
    leavingDate: Date | null;
    achievements: string;
}

interface FormValues {
    experiences: JobExperience[];
}

const validationSchema = yup.object({
    experiences: yup.array().of(
        yup.object({
            companyName: yup.string().required('Company name is required'),
            joiningDate: yup.date().required('Joining date is required'),
            leavingDate: yup.date().required('Leaving date is required'),
            achievements: yup.string(),
        })
    ),
});

const JobExperiences: React.FC<ExperienceProps> = ({ setActiveIndex }) => {
    const [showProject, setShowProject] = useState(false);
    const [experiences, setExperiences] = useState<JobExperience[]>([
        { companyName: '', joiningDate: null, leavingDate: null, achievements: '' },
    ]);

    const formik = useFormik<FormValues>({
        initialValues: {
            experiences,
        },
        validationSchema,
        onSubmit: (values) => {
            console.log('Form Values:', values);
            setActiveIndex(2);
            setShowProject(true);
        },
    });

    if (showProject) {
        return <TopProjects setActiveIndex={setActiveIndex} />;
    }

    const handleAddMore = () => {
        setExperiences([
            ...experiences,
            { companyName: '', joiningDate: null, leavingDate: null, achievements: '' },
        ]);
        formik.setFieldValue('experiences', [
            ...formik.values.experiences,
            { companyName: '', joiningDate: null, leavingDate: null, achievements: '' },
        ]);
    };

    const handleDateChange = (index: number, field: 'joiningDate' | 'leavingDate', date: Date | null) => {
        formik.setFieldValue(`experiences.${index}.${field}`, date);
    };

    return (
        <div className="flex justify-center items-center mt-[20px] mb-[233px]">
            <form
                onSubmit={formik.handleSubmit}
                className="bg-white py-[50px] px-[10px] md:px-[50px] rounded-[10px] shadow-md sm:w-[500px] w-[300px]"
            >
                <p className='block text-[16px] font-[500] mb-[8px] leading-[24px]'>Job Experiences</p>
                {formik.values.experiences.map((experience, index) => (
                    <div key={index}>
                        <div className="mb-[20px] relative">
                            <input
                                id={`experiences.${index}.companyName`}
                                name={`experiences.${index}.companyName`}
                                type="text"
                                onChange={formik.handleChange}
                                value={formik.values.experiences[index].companyName}
                                placeholder="Enter your company name"
                                className="w-full px-4 py-[10px] text-[14px] border border-[#B1B1B1] rounded-[5px] focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-[#B1B1B1] leading-[21px] shadow-md h-[40px]"
                            />
                            <p className="text-[#B1B1B1] text-[10px] font-[300] leading-[15px]">e.g. Google</p>
                            {formik.errors.experiences &&
                                formik.errors.experiences[index] &&
                                (formik.errors.experiences[index] as any)?.companyName &&
                                formik.touched.experiences &&
                                formik.touched.experiences[index]?.companyName && (
                                    <p className="text-red-500 text-xs">
                                        {(formik.errors.experiences[index] as any)?.companyName}
                                    </p>
                                )}
                        </div>

                        {/* DatePickers */}
                        {/* Same handling for joiningDate and leavingDate as shown above */}

                        <div className="mb-[20px]">
                            <textarea
                                id={`experiences.${index}.achievements`}
                                name={`experiences.${index}.achievements`}
                                onChange={formik.handleChange}
                                value={formik.values.experiences[index].achievements}
                                placeholder="What's your achievements in that company (optional)"
                                className="w-full px-4 py-[10px] sm:text-[14px] text-[12px] border border-[#B1B1B1] rounded-[5px] focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-[#B1B1B1] leading-[21px] h-[110px] shadow-md"
                            />
                        </div>
                        <div className='w-[150px] h-[1px] bg-[#B1B1B1] mb-[30px] mt-[10px] mx-auto'></div>
                    </div>
                ))}

                <div className="flex justify-center mb-[30px]">
                    <div onClick={handleAddMore} className='font-[500] text-[14px] leading-[21px] text-[#2850C8] cursor-pointer'>
                        Add More
                    </div>
                </div>

                <Button text="Next" />
            </form>
        </div>
    );
};

export default JobExperiences;
