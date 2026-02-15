import { motion } from 'framer-motion';
import { User, Baby, Contact, Glasses } from 'lucide-react';

const AudienceSelector = ({ onSelect }) => {
    const ageGroups = [
        { id: 'kid', label: 'Kid', icon: Baby, color: 'bg-blue-500' },
        { id: 'teen', label: 'Teen', icon: User, color: 'bg-green-500' },
        { id: 'adult', label: 'Adult', icon: Contact, color: 'bg-purple-500' },
        { id: 'senior', label: 'Senior', icon: Glasses, color: 'bg-orange-500' },
    ];

    const genders = [
        { id: 'male', label: 'Male' },
        { id: 'female', label: 'Female' },
    ];

    const handleSelection = (ageGroup, gender) => {
        onSelect({ age: ageGroup, gender });
    };

    return (
        <div className="flex flex-col items-center gap-8 w-full max-w-2xl">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full">
                {ageGroups.map((group) => (
                    <motion.button
                        key={group.id}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleSelection(group.id, 'male')} // Defaulting to male for now, logic can be refined
                        className={`flex flex-col items-center justify-center p-6 rounded-2xl ${group.color} text-white shadow-lg hover:shadow-xl transition-all`}
                    >
                        <group.icon size={48} className="mb-2" />
                        <span className="text-xl font-bold">{group.label}</span>
                    </motion.button>
                ))}
            </div>
            <p className="text-gray-400 text-sm">Select who the story is for!</p>
        </div>
    );
};

export default AudienceSelector;
