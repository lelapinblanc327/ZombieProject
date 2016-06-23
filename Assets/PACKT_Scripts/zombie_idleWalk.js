#pragma strict
var theAnimator : Animator;
var walkTime : float = 5.0;
var walkTimer : float;
var walking : boolean;

function Start()
{
	theAnimator = GetComponent(Animator); 
}

function Update()
{
	walkTimer += Time.deltaTime;
	if(walkTimer >= walkTime)
	{
		ResetTime();
		walking = !walking;
	}
	if(walking)
	{
		theAnimator.SetBool("IsWalking",true);
	}
	else
	{
		theAnimator.SetBool("IsWalking",false);
	}
}

function ResetTime()
{
	walkTimer = 0.0;
}

