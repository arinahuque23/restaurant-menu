import React from 'react';
import AddMenuForm from './components/AddMenuForm';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

const AddMenu = () => {
    return (
           <div className="pt-16 min-h-screen bg-gray-50">
              <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="mb-6" data-aos="fade-right">
                  <Link href="/menu" className="inline-flex items-center text-gray-600 hover:text-orange-600 transition-colors">
                    <ArrowLeft className="w-5 h-5 mr-2" />
                    Back to Menu
                  </Link>
                </div>
                <div className="text-center mb-8" data-aos="fade-up">
                  <h1 className="text-3xl font-bold text-gray-800 mb-2">Add New Menu Item</h1>
                  <p className="text-gray-600">Fill in the details to add a new item to your menu</p>
                </div>
                <AddMenuForm/>
              </div>
            </div>
    );
};

export default AddMenu;