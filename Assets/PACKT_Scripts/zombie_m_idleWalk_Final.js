#pragma strict
var theAnimator : Animator;
var walkTime : float = 5.0;
var walkTimer : float;
var walking : boolean;
var changeWalk : boolean = false;

function Start()
{
	theAnimator = GetComponent(Animator);
	yield WaitForSeconds(5.0);
	walking = true;
	 
}

function Update()
{
	theAnimator.SetBool("AltWalking",changeWalk);
	
	if(Input.GetKeyDown("b"))
	{
		changeWalk = !changeWalk;
	}

	if(walking)
	{
		theAnimator.SetBool("IsWalking",true);
	}
}


