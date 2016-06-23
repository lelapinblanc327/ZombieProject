﻿using UnityEngine;
using System.Collections;

public class zombie_chapter9_Final : MonoBehaviour 
{
	public Animator theAnimator;
	public CharacterController charControl;
	public float walkSpeed  = 2f;
	
	public Transform target;
	public bool alerted = false;
	public AudioClip snarlSound;
	public bool soundReady = true;
	
	public float turnSpeed  = 60f;
	public bool turning;
	public float angle;

	public float distance;
	public float awareRange = 4f;

	public Transform [] patrolPts;
	public int currPt;
	public Transform targetedPt;
	public float ptDistance;
	public float changeDistance = 0.5f;
	public float turnTime = 5f;
	public bool moving  = true;
	public float speed;
	public float alertDistance  = 3f;

	public float attackRange  = 1.5f;
	public bool attacking;
	public float attackDuration = 2f;
	public float attackTimer;

	public int damage = 2;
	public int zombieHealth = 5;
	public Transform deadPrefab;

	void Start () 
	{
		target = GameObject.FindWithTag ("Player").transform;
		theAnimator = GetComponent<Animator>();
		charControl = GetComponent<CharacterController>();

		Invoke ("Walks", Random.Range (3f, 5f));
	}
	
	void Update () 
	{
		float speedFactor = theAnimator.GetFloat("ForwardMovement");
		speed = walkSpeed * speedFactor;

		theAnimator.SetBool ("IsTurning", turning);

		distance = Vector3.Distance(target.position, transform.position);

		targetedPt = patrolPts[currPt];
		float patrolPtDistance = Vector3.Distance(targetedPt.position, transform.position);
		float playerDistance = Vector3.Distance(target.position, transform.position);
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
				if(attackTimer <= 0f)
				{
					attacking = false;
				}
			}if(angle > 5f ||angle < -5f)
			{
				turning = true;
				theAnimator.SetFloat("Speed",0f);
			}
			else if(angle < 5f && angle > -5f)
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
			if(patrolPtDistance <= changeDistance)
			{
				ChangePt();
				turning = true;
			}
		}
		if(turning)
		{
			TurnToPoint();
			if(angle < 2f && angle > -2f)
			{
				WalkTowards();
			}
		}
		if(currPt > patrolPts.Length-1)
		{
			currPt = 0;
		}
	}

	void ChangePt()
	{
		currPt++;	
	}

	void Walks()
	{
		theAnimator.SetBool("IsWalking",true);
	}

	void TurnToPoint()
	{
		theAnimator.SetBool("IsWalking",false);
		Vector3 localRotate = transform.InverseTransformPoint(targetedPt.position);
		angle = Mathf.Atan2 (localRotate.x, localRotate.z) * Mathf.Rad2Deg;
		float maxRotation = turnSpeed * Time.deltaTime;
		float turnAngle = Mathf.Clamp(angle, -maxRotation, maxRotation);
		transform.Rotate(0, turnAngle, 0);
		//return angle;
	}

	void WalkTowards()
	{
		turning = false;
		Vector3 direction = transform.TransformDirection(Vector3.forward * 	speed);
		charControl.SimpleMove(direction);
		//theAnimator.SetFloat("Speed",walkSpeed);
		theAnimator.SetBool("IsWalking", true);
	}

	void Snarl()
	{
		GetComponent<AudioSource>().PlayOneShot(snarlSound);
		
		theAnimator.SetTrigger("IsSnarling");
		soundReady = false;
	}

	void Attack()
	{
		theAnimator.SetTrigger("IsAttacking");
		attackTimer = attackDuration;
		attacking = true;

		Transform playerStatus =
			target.Find("FirstPersonCharacter/player_m");
		playerStatus.SendMessage("AddDamage", damage);
	}

	void AddDamage(int damage)
	{
		zombieHealth -= damage;
		if(zombieHealth <= 0)
		{
			zombieHealth = 0;
			Dead();
		}
	}

	void Dead()
	{
		Destroy(gameObject);
		if(deadPrefab)
		{
			Transform dead = Instantiate(deadPrefab,transform.position, transform.rotation)as Transform;
			CopyTransformsRecurse(transform, dead);
		}
	}
	static void CopyTransformsRecurse (Transform src, Transform dst)
	{
		dst.position = src.position;
		dst.rotation = src.rotation;
		foreach(Transform child in dst)
		{
			Transform curSrc = src.Find(child.name);
			if(curSrc)
			{	
				CopyTransformsRecurse(curSrc, child);
			}
		}
	}
}
