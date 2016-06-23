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

var distance : float;
var awareRange : float = 4.0;

var patrolPts : Transform[];
var currPt : int;
var targetedPt : Transform;
var changeDistance : float = 0.5;
var turnTime : float = 5.0;
var moving : boolean = true;
var speed : float;

var alertDistance : float = 3.0;
var attackRange : float = 1.5;
var attacking : boolean = false;
var attackDuration : float = 2.0;
var attackTimer : float;

var damage: int = 2;
var zombieHealth : int = 5;
var deadPrefab : Transform;

function Start()
{
	target = GameObject.FindWithTag ("Player").transform;
	theAnimator = GetComponent(Animator);
	charControl =  GetComponent(CharacterController);
	
	Walks();
}

function Update()
{
	var speedFactor = theAnimator.GetFloat("ForwardMovement");
	speed = walkSpeed * speedFactor;
	
	theAnimator.SetBool("IsTurning", turning);
	
	distance = Vector3.Distance(target.position, transform.position);
	
	targetedPt = patrolPts[currPt];
	var ptDistance : float =
	Vector3.Distance(targetedPt.position, transform.position);
	var playerDistance = Vector3.Distance(target.position,
	transform.position);
	if(playerDistance <= alertDistance)
	{
		alerted = true;
	}

	if(distance <= awareRange)
	{
		alerted = true;
	}	

	if(alerted)
	{
		targetedPt = target;
		TurnToPoint();
		if(playerDistance <= attackRange && !attacking)
		{
			Attack();
		}
		if(attacking)
		{
			attackTimer -= Time.deltaTime;
			if(attackTimer <= 0.0)
			{
				attacking = false;
			}
		}
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
	else
	{
		if(ptDistance <= changeDistance)
		{
			ChangePt();
			turning = true;
		}
	}
	if(turning)
	{
		TurnToPoint();
		if(angle < 2 && angle > -2)
		{
			WalkTowards();
		}
	}
	if(currPt > patrolPts.Length-1)
	{
		currPt = 0;
	}
}

function ChangePt()
{
	currPt++;
}

function Walks()
{
	theAnimator.SetBool("IsWalking",true);
	return;
}

function TurnToPoint()
{
	theAnimator.SetBool("IsWalking",false);
	var localRotate = transform.InverseTransformPoint(targetedPt.position);
	angle = Mathf.Atan2 (localRotate.x, localRotate.z) * Mathf.Rad2Deg;
	var maxRotation = turnSpeed * Time.deltaTime;
	var turnAngle = Mathf.Clamp(angle, -maxRotation, maxRotation);
	transform.Rotate(0, turnAngle, 0);
	return angle;
}

function WalkTowards()
{
	turning = false;
	var direction = transform.TransformDirection(Vector3.forward * 	speed);
	charControl.SimpleMove(direction);
	theAnimator.SetBool("IsWalking", true);
}

function Snarl()
{
	GetComponent.<AudioSource>().PlayOneShot(snarlSound);
	
	theAnimator.SetTrigger("IsSnarling");
	soundReady = false;
}

function Attack()
{
	theAnimator.SetTrigger("IsAttacking");
	attackTimer = attackDuration;
	attacking = true;
	
	var playerStatus = target.Find("FirstPersonCharacter/player_m");
	playerStatus.SendMessage("AddDamage", damage);
}

function AddDamage(damage : int)
{
	zombieHealth -= damage;
	if(zombieHealth <= 0)
	{
		zombieHealth = 0;
		Dead();
	}
}

function Dead()
{
	Destroy(gameObject);
	if(deadPrefab)
	{
		var dead : Transform = Instantiate(deadPrefab,transform.position, transform.rotation);
CopyTransformsRecurse(transform, dead);
	}
}

static function CopyTransformsRecurse (src : Transform, dst
: Transform)
{
	dst.position = src.position;
	dst.rotation = src.rotation;
	for(var child : Transform in dst)
	{
		var curSrc = src.Find(child.name);
		if(curSrc)
		CopyTransformsRecurse(curSrc, child);
	}
}