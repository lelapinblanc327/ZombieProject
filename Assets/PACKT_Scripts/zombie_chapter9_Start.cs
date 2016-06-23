using UnityEngine;
using System.Collections;

public class zombie_chapter9_Start : MonoBehaviour 
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

	void Start () 
	{
		theAnimator = GetComponent<Animator>();
		charControl = GetComponent<CharacterController>();

		Invoke ("Walks", Random.Range (3f, 5f));
	}
	
	void Update () 
	{
		theAnimator.SetBool ("IsTurning", turning);

		if(Input.GetButton("Fire1") && alerted == false)
		{
			alerted = true;
		}	
		
		if(alerted)
		{
			TurnToPlayer();
			if(angle > 5f ||angle < -5f)
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
	}

	void Walks()
	{
		theAnimator.SetBool("IsWalking",true);
	}

	void TurnToPlayer()
	{
		theAnimator.SetBool("IsWalking",false);
		Vector3 localRotate = transform.InverseTransformPoint(target.position);
		angle = Mathf.Atan2 (localRotate.x, localRotate.z) * Mathf.Rad2Deg;
		float maxRotation = turnSpeed * Time.deltaTime;
		float turnAngle = Mathf.Clamp(angle, -maxRotation, maxRotation);
		transform.Rotate(0, turnAngle, 0);
	}

	void WalkTowards()
	{
		Vector3 direction = transform.TransformDirection(Vector3.forward * 	walkSpeed);
		charControl.SimpleMove(direction);
		theAnimator.SetBool("IsWalking", true);
	}

	void Snarl()
	{
		GetComponent<AudioSource>().PlayOneShot(snarlSound);
		
		theAnimator.SetTrigger("IsSnarling");
		soundReady = false;
	}
}
