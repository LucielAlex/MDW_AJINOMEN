import { User } from "lucide-react";
import SettingSection from "./SettingSection";
import { useAuth } from "../../context/authContext";



const Profile = () => {

	const { isAuthenticated, logout, user } = useAuth();


	return (
		<SettingSection icon={User} title={"Perfil"}>
			<div className='flex flex-col sm:flex-row items-center mb-6'>
				<img
					src='src/perfil.jpg'
					alt='Profile'
					className='rounded-full w-20 h-20 object-cover mr-4'
				/>
				{isAuthenticated ? (
				<div>
					<h3 className='text-lg font-semibold text-white'>Administrador {user.username}</h3>
					<p className='text-white'>{user.email} </p>
				</div>
				):(
					<>
					</>
				)}
				
			</div>

			
		</SettingSection>
	);
};
export default Profile;
