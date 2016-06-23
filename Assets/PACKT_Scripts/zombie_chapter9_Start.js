#pragma strict

var theAnimator : Animator;
var charControl : CharacterController;
var walkSpeed : float = 2.0;

var target : Transform;
var alerted : boolean = false;
var snarlSound : AudioClip;
var soundReady : boolean = true;

var turnSpeed : float = 60.0;
var turning : boolean = false;
var angle : float;

function Start()
{
	theAnimator = GetComponent(Animator);
	charControl =  GetComponent(CharacterController);
	
	yield WaitForSeconds (Random.Range(3, 5));
	Walks();
}

function Update()
{
	theAnimator.SetBool("IsTurning", turning);
	
	if(Input.GetButton("Fire1") && alerted == false)
	{
		alerted = true;
	}	

	if(alerted)
	{
		TurnToPlayer();
		if(angle > 5 ||angle < -5)
		{
			turning = true;
			theAnimator.SetFloat("Speed",0.0);
		}
		else if(angle < 5 && angle > -5)
		{
			if(soundReady)
			{
				Snarl();
			}
			else
			{
				turning = false;
				WalkTowards();
			}
		}
	}
}


function Walks()
{
	theAnimator.SetBool("IsWalking",true);
	return;
}

function TurnToPlayer()
{
	theAnimator.SetBool("IsWalking",false);
	var localRotate = transform.InverseTransformPoint(target.position);
	angle = Mathf.Atan2 (localRotate.x, localRotate.z) * Mathf.Rad2Deg;
	var maxRotation = turnSpeed * Time.deltaTime;
	var turnAngle = Mathf.Clamp(angle, -maxRotation, maxRotation);
	transform.Rotate(0, turnAngle, 0);
	return angle;
}

function WalkTowards()
{
	var direction = transform.TransformDirection(Vector3.forward * 	walkSpeed);
	charControl.SimpleMove(direction);
	theAnimator.SetBool("IsWalking", true);
}

function Snarl()
{
	GetComponent.<AudioSource>().PlayOneShot(snarlSound);
	
	theAnimator.SetTrigger("IsSnarling");
	soundReady = false;
}