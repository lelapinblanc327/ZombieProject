function Start()
{
	var theAnimator : Animator = GetComponent(Animator); 
	//this is a new private variable
	
	if(theAnimator.layerCount >=2)
		{
		theAnimator.SetLayerWeight(1,1);
		}
	
	yield WaitForSeconds (5);
	Walks();
}

function Walks()
//Custom function to contain the data
//This function is played automatically after the character has Idled for 5 seconds 
//as defined in the Start function
{
	var theAnimator : Animator = GetComponent(Animator); 
	//this is a new private variable
	theAnimator.SetBool("isWalking",true);
	yield WaitForSeconds (2);
	theAnimator.SetBool("altWalking",true);
	theAnimator.SetBool("headSwitch",true);
	//yield WaitForSeconds(10);
	//theAnimator.SetBool("isWalking",false);
	//yield WaitForSeconds(5);
}