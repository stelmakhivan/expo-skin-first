import { Button, Text, View } from '@/components';
import { useAuth } from '@/services';

const Home = () => {
  const { signOut } = useAuth();

  const handleSignOut = async () => {
    await signOut();
  };

  return (
    <View>
      <Button
        onPress={handleSignOut}
        className="w-[207px] p-3 rounded-full self-center justify-center items-center active:opacity-80"
        colorName="primary">
        <Text className="!text-white font-ls-medium text-2xl leading-6">Sign Out</Text>
      </Button>
    </View>
  );
};

export default Home;
