import {
  Film,
  Car,
  ShoppingBag,
  Utensils,
  Receipt,
  GraduationCap,
  HeartPulse,
  RefreshCw,
  CupSoda,
  Shapes,
} from "lucide-react";

// Helper to get category-specific styles and icons
export const categoryConfig = {
  food: {
    color: "bg-orange-50 text-orange-700",
    icon: <Utensils size={14} className="mr-1" />,
    label: "Food",
  },
  drinks: {
    color: "bg-amber-50 text-amber-700",
    icon: <CupSoda size={14} className="mr-1" />,
    label: "Drinks",
  },
  shopping: {
    color: "bg-pink-50 text-pink-600",
    icon: <ShoppingBag size={14} className="mr-1" />,
    label: "Shopping",
  },
  bills: {
    color: "bg-red-50 text-red-600",
    icon: <Receipt size={14} className="mr-1" />,
    label: "Bills",
  },
  education: {
    color: "bg-indigo-50 text-indigo-600",
    icon: <GraduationCap size={14} className="mr-1" />,
    label: "Education",
  },
  health: {
    color: "bg-emerald-50 text-emerald-600",
    icon: <HeartPulse size={14} className="mr-1" />,
    label: "Health",
  },
  entertainment: {
    color: "bg-purple-50 text-purple-600",
    icon: <Film size={14} className="mr-1" />,
    label: "Entertainment",
  },
  transport: {
    color: "bg-blue-50 text-blue-600",
    icon: <Car size={14} className="mr-1" />,
    label: "Transport",
  },
  subscriptions: {
    color: "bg-cyan-50 text-cyan-600",
    icon: <RefreshCw size={14} className="mr-1" />,
    label: "Subscriptions",
  },
  other: {
    color: "bg-gray-50 text-gray-600",
    icon: <Shapes  size={14} className="mr-1"/>,
    label: "Other",
  },
};
