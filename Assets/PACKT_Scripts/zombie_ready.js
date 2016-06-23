var theAnimator : Animator;
var charControl : CharacterController;
var walkSpeed : float = 2.0;

function Start()
{
	theAnimator = GetComponent(Animator);
	charControl =  GetComponent(CharacterController);
	
	yield WaitForSeconds (Random.Range(3, 5));
	Walks();
}

function Update()
{

}

function Walks()
{
	theAnimator.SetBool("IsWalking",true);
	return;
}


